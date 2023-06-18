const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectTOMongo = require("./config/db");


//env config
require("dotenv").config();

//mongo connection
connectTOMongo();

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use('/api/v1/auth',require("./routes/auth.js"))
app.use('/api/v1/blog',require("./routes/blog.js"))

//listen
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgGreen.white)
  })