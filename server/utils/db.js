const mongoose= require("mongoose");

const URI= process.env.MONGODB_URI;

const connectDb= async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Successfully connected with DB");
    } catch (error) {
        console.log("Connection with db failed");
        process.exit(0);
    }
}

module.exports=connectDb;