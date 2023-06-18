const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user")
    if (blogs.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      blogCount: blogs.length,
      success: true,
      message: "all blogs list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while getting blog",
      error,
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    const existingUser = await User.findById(req.user.id)
    // validation
  if(!existingUser){
      return res.status(404).send({
          success:false,
          message:"User not found"
      })
  }
    const blog = new Blog({
      title,
      description,
      image,
      user: req.user.id,
    })
    
    const session = await mongoose.startSession()
    session.startTransaction()
   await blog.save({session})
   existingUser.blogs.push(blog)
   await existingUser.save({session})
   await session.commitTransaction()
   await blog.save();
    return res.status(200).send({
      success: true,
      message: "Blog created succesfully",
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create blog",
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const{id} = req.params
    const {title,description,image}=req.body;
    const blog = await Blog.findByIdAndUpdate(id,{title:title,description:description,image:image,user:req.user.id},{new:true})
    return res.status(200).send({
        success:true,
        message:"Blog updated",
        blog
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
        success:false,
        message:"internal server error"}); 
  }
};

exports.getBlogByIdController = async(req,res) => {
    try {
        const {id} = req.params;
        
        const blog = await Blog.findById(id)
        if(!blog){
            res.status(400).send({
                success:false,
                message:"No blog found"
        })
        }
        return res.status(200).send({
            success:true,
            message:"got a blog",
            blog
        })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:"error in single blog"
            })
        }

};

exports.deleteBlogController = async(req,res) => {
    try {
        const blog=await Blog.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();

        return res.status(200).send({
            success:true,
            message:"Blog deleted", 
        })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:"error in single blog",
                error
            })
        }
};

exports.userBlogsController = async(req,res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id }).populate("user")
        if (blogs.length === 0) {
            return res.status(200).send({
              success: false,
              message: "No blogs found",
            });
          }
       return res.status(200).send({
        success:true,
        message:"user blogs",
        blogs
       })
      } catch (error) {
        console.error(error.message);
        res.status(500).send({
            success:false,
            message:"internal server error"}); 
      }
};