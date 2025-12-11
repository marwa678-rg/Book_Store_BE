const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  // add fields here
price:{type:Number,required:true},
buyDate:{type:Date,default:Date.now()},

//user vs  perform purchases (1-M)
userId:{type:mongoose.SchemaTypes.ObjectId, ref:"User",required:true},
//many purchases done vs one Book (M-1)
bookId:{type:mongoose.SchemaTypes.ObjectId,ref:"Book",required:true},

},{timestamps:true});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports={Purchase};