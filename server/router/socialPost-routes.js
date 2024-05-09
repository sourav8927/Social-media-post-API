const express=require("express");
const { getAllPosts,addPost, updatePost, deletePost } = require("../controller/socialPost-controller");
const blogRouter= express.Router();


blogRouter.get("/",getAllPosts)
blogRouter.post("/add",addPost)
blogRouter.put("/update/:id",updatePost)
blogRouter.delete("/:id",deletePost)

module.exports=blogRouter;