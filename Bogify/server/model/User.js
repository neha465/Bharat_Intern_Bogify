const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema); //modelname,schema //exports others
User.createIndexes(); //this prevent duplication of user in mongodb
module.exports = User;