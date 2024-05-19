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

//For adding Like in posts
const postLikes = async (req, res,next) => {
    try {
    
    const id = req.params.id;
    console.log(`Received request to like post with ID: ${id}`);
      // Find the post by ID
      const post = await SocialPost.findById(id);
      if (!post) {
        console.log(`Post with ID ${id} not found`);
        return res.status(404).json({ msg: "Post not found" });
      }
  
      // Increment the likes count
      post.like = (post.like || 0) + 1;
  
      // Save the updated post
      await post.save();
  
      console.log(`Post with ID ${id} liked successfully. Total likes: ${post.like}`);
      res.status(200).json({ msg: "Post liked successfully", like: post.like });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };

  //For adding Comments in posts
  const addComments = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const { user, content } = req.body;
      
      const post = await SocialPost.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      const comment = {
        user,
        content,
        timestamp: new Date()
      };
  
      post.comments.push(comment);
      await post.save();
      
      console.log(post.comments);
      res.status(200).json({ msg: 'Comment added successfully', comments: post.comments });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
module.exports={getAllPosts,addPost,updatePost,deletePost,getById,postLikes,addComments};