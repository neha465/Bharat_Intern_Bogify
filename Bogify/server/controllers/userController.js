const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt"); //this is for incryption
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET


//all users
exports.getUsers = async (req, res) => {
  let success = false;
  try { 
    const user =await User.find({})
    return res.status(200).send({user})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get sll user callback",
    });
  }
};

//register user
exports.registerUser = async (req, res) => {
  let success = false;
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(200).send({
        success: false,
        message: "User with this email already exists",
      });
    }

    const secPass = await bcrypt.hash(password, 10);
    //waiting for user to create
    user = await User.create({
      username: username,
      email: email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    
    //send data and secret in the form of authtoken
    const authtoken =await jwt.sign(data, JWT_SECRET); 
    success = true;
    res.status(200).send({ success, message: "User created successfully", authtoken,user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in register callback",
    });
  }
};

//login user
exports.loginUser = async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Please login with correct credentials",
        });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Please login with correct credentials",
        });
    }

    const data = {
      //in data we are sending id of user
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(200).send({ success, message: "User login succesfully", authtoken,user});
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login callback",
    });
  }
};