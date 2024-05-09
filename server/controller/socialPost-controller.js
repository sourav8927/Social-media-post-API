const SocialPost=require("../models/socialPost-model");

const getAllPosts= async (req,res,next)=>{
    let posts;
    try {
        posts=await SocialPost.find();
    } catch (error) {
        return console.log(error)
    }
    if(!posts){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({posts})
}

const addPost=  async(req,res,next)=>{
    const {title,description,image,user}= req.body;
    const post= new SocialPost({
        title,
        description,
        image,
        user,
    });
    try {
       await post.save()
    } catch (error) {
        return console.log(error)
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
        return res.status(500).json({message:"Unable to update the blog"})
    }
 
    return res.status(200).json({post})
}

const deletePost=  async(req,res,next)=>{

    const id=req.params.id;
    let post;
    try {
        post=await SocialPost.findByIdAndRemove(id)
    } catch (error) {
        return console.log(error)
        
    }
    if(!post){
        return res.status(500).json({message:"Unable to delete the blog"})
    }
 
    return res.status(200).json({message:"Successfully deleted"})
}
module.exports={getAllPosts,addPost,updatePost,deletePost};