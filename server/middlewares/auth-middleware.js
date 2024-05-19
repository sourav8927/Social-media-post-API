const jwt= require("jsonwebtoken");
const User=require("../models/user-model");

const authMiddleware= async(req,res,next)=>{
    const token= req.header("Authorization");
    if(!token){
        return res.status(401).json({msg:"Unauthorized http, token not provided"});
    }
    

    //for removing bearer with space form the stored token
    const jwtToken= token.replace("Bearer","").trim();
    console.log("token from auth middleware",jwtToken);

    try {
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        
        const userData= await User.findOne({email:isVerified.email})
        .select({password:0,});
        console.log(userData);

        req.user=userData;
        req.token=token;
        req.userId=userData._id;
        next(); 
    } catch (error) {
        
    }
    
}

module.exports=authMiddleware;