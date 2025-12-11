
//imports
const Joi = require("joi");
//add schema
const addBookSchema=Joi.object({
title:Joi.string().min(3).required(),
author:Joi.string().min(3).required(),
category:Joi.string().min(3).required(),
stock:Joi.number().integer().required(),
price:Joi.number().positive().precision(2).required(),
coverImage:Joi.string().uri().optional(),
});


//update Schema
const updateBookSchema =Joi.object({
   stock:Joi.number().integer().required(),
price:Joi.number().positive().precision(2).required(),
});





module.exports={
  addBookSchema,
  updateBookSchema,
};