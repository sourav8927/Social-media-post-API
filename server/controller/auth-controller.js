const User= require("../models/user-model");
const bcrypt= require("bcryptjs");

const register=async(req,res)=>{
    try {
        console.log(req.body);
        const {username,email,phone,password} =req.body;
        const userExist= await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg:"Email already exist"});
        }
        // const salt=10;
        // const hass_password= await bcrypt.hash(password,salt);
        const userCreated= await User.create({
            username,
            email,
            phone,
            password,
            posts:[],
        });
        res.status(201).json({msg:"Registration successfully",userCreated,token: await userCreated.generateToken(),userId: userCreated._id.toString()});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
};

const login= async(req,res)=>{
    try {
        console.log(req.body);
        const {email,password}=req.body;
        const userExist= await User.findOne({email});
        if(!userExist){
            return res.status(400).json({msg:"Invalid Credantials"})
        }
        const user= await userExist.comparePassword(password);

        if(user){
            res.status(200).json({msg:"login successfully",token: await userExist.generateToken(),userId: userExist._id.toString()});
        }else{
            res.status(500).json({msg:"Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({msg:"Internal server error"});
    }
}


module.exports={register,login};