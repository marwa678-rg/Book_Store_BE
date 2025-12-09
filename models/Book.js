const { ref } = require("joi");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  // add fields here
title:{type:String,required:true},

author:{type:String},

category:{type:String,required:true},
//url
coverImage:{type:String},

stock:{type:String,required:true,
  default:1},

  price:{type:Number,required:true},

  //relation  (User VS Book)  1-M
userId:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true},

},{timestamps:true});
const Book = mongoose.model("Book",BookSchema);

module.exports = {Book}
