const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // add fields here
name:{type:String,trim:true},

email:{type:String,required:true,unique:true},

password:{type:String,required:true},

role:{type:String,enum:["user","admin"],default:"user"},

},{timestamps:true});




const User=mongoose.model("User",UserSchema)


module.exports ={User} ;
