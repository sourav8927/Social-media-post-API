const mongoose=require("mongoose");
const { required } = require("../validators/auth-validator");

const Schema= mongoose.Schema;

const socialPostSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
});

//define model and collection name for social media post
const SocialPost=new mongoose.model("Post",socialPostSchema);

module.exports=SocialPost;

