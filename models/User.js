const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // add fields here
name:{type:String,required:true,trim:true},

email:{type:String,required:true,unique:true},

password:{type:String,required:true},

role:{type:String,enum:["user","admin"],default:"user"},

 otp:{type:String,maxLength:6},

  otpExpires:{type:Date},

  isVerify:{type:Boolean,default:false},

  resetPasswordToken:{type:String},
  
  resetPasswordExpiresIN:{type:Date},

},{timestamps:true});




const User=mongoose.model("User",UserSchema)


module.exports ={User} ;
