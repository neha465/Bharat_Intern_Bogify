const express = require("express");
const { createBlogController, getAllBlogsController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogsController } = require("../controllers/blogController");
const fetchuser = require("../middleware/fetchuser");


//router object
const router = express.Router();

//routes handler

//GET || get all blogs
router.get("/all-blogs",getAllBlogsController)

//POST || create blog
router.post("/create-blog",fetchuser,createBlogController)

//PUT || update blog
router.put("/update-blog/:id",fetchuser,updateBlogController)

//GET ||single Blog
router.get("/get-blog/:id",getBlogByIdController)

//DELETE || delete blog
router.delete("/delete-blog/:id",deleteBlogController)

//GET ||User blog
router.get("/users-blog",fetchuser,userBlogsController)

module.exports = router;