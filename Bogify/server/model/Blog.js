const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  title:{
    type:String,
    required:true
  }, 
  description:{
    type:String,
    required:true,
  },
   image:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
    
  });
  const Blog= mongoose.model("blog",BlogSchema) //modelname,schema //exports others
//   Blog.createIndexes(); //this prevent duplication of user in mongodb
  module.exports =Blog;