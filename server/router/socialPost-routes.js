const express=require("express");
const { getAllPosts,addPost, updatePost, deletePost, getById, postLikes } = require("../controller/socialPost-controller");
const blogRouter= express.Router();


blogRouter.get("/",getAllPosts)
blogRouter.post("/add",addPost)
blogRouter.put("/update/:id",updatePost)
blogRouter.delete("/:id",deletePost)
blogRouter.get("/:id",getById)

//For like and comment
blogRouter.post("/:id/like",postLikes)
// blogRouter.post("/:id/comments",postComments)
module.exports=blogRouter;