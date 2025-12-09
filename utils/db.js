

//Imports 
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Config
dotenv.config();

//connection DB
async function connectToDatabase(){
  // build connection here
try {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(`Mongo Cloud Connection Successfully`)
} catch (error) {
  console.log(error)
}

};

module.exports ={connectToDatabase}