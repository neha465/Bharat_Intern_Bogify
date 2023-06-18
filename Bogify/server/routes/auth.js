const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controllers/userController")
const {register,login} =require("../validation/validation.js");
const fetchuser = require("../middleware/fetchuser");

//router object
const router = express.Router();

//all users
router.get("/get-user",getUsers)

//register user
router.post("/register",register,registerUser)

//login user
router.post("/login",login,loginUser)

module.exports = router;