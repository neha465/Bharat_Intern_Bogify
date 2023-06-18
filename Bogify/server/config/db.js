const mongoose = require("mongoose");
const colors = require("colors")
require("dotenv").config();
const MONGO_URL =process.env.MONGO_URL

const connectTOMongo =async()=>{
    try {
        await mongoose.connect(MONGO_URL)  
        console.log("Mongo connected".bgMagenta.white)
    } catch (error) {
        console.log(error,"Mongo Connection error".bgCyan.white)
        
    }
}
module.exports = connectTOMongo;