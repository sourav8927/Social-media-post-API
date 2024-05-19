const express=require("express");
const { getAllPosts,addPost, updatePost, deletePost, getById, postLikes,addComments } = require("../controller/socialPost-controller");
const blogRouter= express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

blogRouter.get("/",authMiddleware,getAllPosts)
blogRouter.post("/add",authMiddleware,addPost)
blogRouter.put("/update/:id",authMiddleware,updatePost)
blogRouter.delete("/:id",authMiddleware,deletePost)
blogRouter.get("/:id",authMiddleware,getById)

//For like and comment
blogRouter.post("/:id/likes",authMiddleware,postLikes)
blogRouter.post("/:id/comments",authMiddleware,addComments)
module.exports=blogRouter;