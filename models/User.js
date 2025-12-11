const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // add fields here
name:{type:String,trim:true},

email:{type:String,required:true,unique:true},

password:{type:String,required:true},

role:{type:String,enum:["user","admin"],default:"user"},

otp:{type:String,maxLength:6},
otpExpires:{type:Date},
isVerify:{type:Boolean,default:false},

//count of Request of otp =>prevent spam
otpRequestCount:{type:Number,default:0}


});




const User=mongoose.model("User",UserSchema)


module.exports ={User} ;
