const mongoose=require("mongoose");
const { required } = require("../validators/auth-validator");
const { number } = require("zod");

const Schema= mongoose.Schema;
//Schema for the Comment section
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });
//Schema for the post
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
    comments:[commentSchema],
    
    like:{
        type: Number,
        default:0,
    }
});

//define model and collection name for social media post
const SocialPost=new mongoose.model("Post",socialPostSchema);

module.exports=SocialPost;

