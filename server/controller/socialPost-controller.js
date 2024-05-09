const { default: mongoose } = require("mongoose");
const SocialPost=require("../models/socialPost-model");
const User = require("../models/user-model");

const getAllPosts= async (req,res,next)=>{
    let posts;
    try {
        posts=await SocialPost.find();
    } catch (error) {
        return console.log(error)
    }
    if(!posts){
        return res.status(404).json({message:"No posts Found"})
    }
    return res.status(200).json({posts})
}

const addPost=  async(req,res,next)=>{
    const {title,description,image,user}= req.body;
    let existingUser;
    try {
        existingUser=await User.findById(user);
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user by this id"})
    }
    const post= new SocialPost({
        title,
        description,
        image,
        user,
    });
    try {
      const session= await mongoose.startSession();
      session.startTransaction();
      await post.save({session});
      existingUser.posts.push(post);
      await existingUser.save({session})
      await session.commitTransaction();
    } catch (error) {
         console.log(error)
        return res.status(500).json({message:error})
    }
    return res.status(200).json({post});
}

const updatePost=  async(req,res,next)=>{
    const {title,description}=req.body;
    const postId=req.params.id;
    let post;
    try {
        post=await SocialPost.findByIdAndUpdate(postId,{
            title,
            description
        })
    } catch (error) {
        return console.log(error)
        
    }
    if(!post){
        return res.status(500).json({message:"Unable to update the post"})
    }
 
    return res.status(200).json({post})
}

const deletePost=  async(req,res,next)=>{

    const id=req.params.id;
    let post;
    try {
        post=await SocialPost.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
        
    }
    if(!post){
        return res.status(500).json({message:"Unable to delete the post"});
    }
 
    return res.status(200).json({message:"Successfully deleted"});
}

const getById= async(req,res,next)=>{
    const id=req.params.id;
    let post;
    try {
        post=await SocialPost.findById(id)
    } catch (error) {
        console.log(error)
    }
    if(!post){
        return res.status(500).json({message:"No post found"});
    }
 
    return res.status(200).json({post});
}

const postLikes=async(req,res,next)=>{
    const postId = req.params.postId;
    let index;
    try {
       index =await posts.findIndex(post => post.id === postId);
    if (index === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }
    posts[index].likes = (posts[index].likes || 0) + 1;
    res.json(posts[index]);
    } catch (error) {
        console.log(error)
    }
    
}
module.exports={getAllPosts,addPost,updatePost,deletePost,getById,postLikes};