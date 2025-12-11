

// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv");

//Internal Imports
const {User} = require("../models/User");
const { registerSchema, verifySchema, loginSchema, resendOtpSchema } = require("../validation/userVlidation");
const { sendMail } = require("../utils/sendMail");
const { generateOtp } = require("../utils/generateOtp");

// Global config
dotenv.config();

//TODO:REGISTER
async function register(request, response) {
  try {
    // validate input
    const { error, value } = registerSchema.validate(request.body, { abortEarly: false });

    if (error) {
      return response.status(400).json({
        messages: error.details.map((e) => e.message),
      });
    }

    // extract data
    const { email, password } = value;

    // check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return response.status(400).json({ message: "Email Already Exists!" });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 12);

    // generate OTP
     const{otp,otpExpires}= generateOtp();

    // create user
    const user = await User.create({
      email,
      password: hashPass,
      otp,
      otpExpires,
    });

    // send email
    await sendMail(email, "OTP Code", `Your OTP is: ${otp}`);

    return response.status(201).json({
      message: "OTP sent to your email",
    });
      

  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error!" });
  }
}


//TODO:LOGIN
async function login(request,response){
   try {
    //Extract Data
    const {error,value}=loginSchema.validate(request.body,{abortEarly:false})
    if(error){
  return response
  .status(400)
  .json({messages:error.details.map((e)=>e.message)})
}
const{email,password}= value;
//check user effesct
const user = await User.findOne({email});
if(!user){
  return response.status(400).json({message:" Invalid Email Or Password"})
}
//Compare password
const isMatch = await bcrypt.compare(password ,user.password)
if(!isMatch){
  return response.status(400).json({message:"Invalid Email or Password"});
}
//check is Verify
//frontend => redirect verify otp route
if(!user.isVerify){
  return response.status(403).json({
    message:"Acount not verified Yet ",
    isVerify:false,
    email:user.email,
  })
}
//generate Token
 const token = jwt.sign({id:user._id,role:user.role},
  process.env.JWT_SECRET,
  {expiresIn:process.env.JWT_EXPIRES_IN}
);
 response.json({message:"Loggedin Successfully",token,})


 } catch (error) {
    console.log(error)
    response.status(500).json({message:"Internal Server Error !"})
 }
}

//TODO:verifyOtp
async function verifyOtp(request,response){
  try {
//Validate
   const{error,value}=verifySchema.validate(request.body,{abortEarly:false})   
    if(error){
      return response.status(400).json({message:error.details.map((e)=>e.message)});
    }

  //Extract Data
  const{email,otp}=value;
  //validate User
  const user= await User.findOne({email});
  if(!user){
    return response.status(400)
    .json({message:" This Email Not Related To User"})
  }
  //Validate OTP
  if(user.otp !== otp || user.otpExpires < Date.now()){
    return response.status(400).json({message:"Invalid OTP or expired OTP"})
  }
//verify
user.isVerify= true;
user.otp= undefined;
user.otpExpires=undefined;
//save user
await user.save();
response.json({message:"Account Verified Successfully"})
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error!" });
  }
}
//TODO:resendOTP
async function resendOtp(request,response){
  try {

    //validate
    const {error,value}=resendOtpSchema.validate(request.body);
    if(error){
      return response.status(400).json({message:error.message})
    }
//Extract data
const{email}=value;
//check user exist
const user= await User.findOne({email});
if(!user){
return response.status(400).json({message:"This Email Not Related To User"});
}
//check verify
if(user.isVerify){
  return response.status(400).json({message:"User Already is Verified"})
}
//check resend limit
if(user.otpRequestCount >= 2){
  return response.json({message:"OTP limit reached ,Try Again later.."})
}

//generate OTP +OTPExpires
 const{otp,otpExpires}= generateOtp();
 //update userInfo
 user.otp=otp;
 user.otpExpires=otpExpires;
 user.otpRequestCount += 1;

 //save user
 await user.save();
 //sendMail
 await sendMail(email,"New OTP Code",`Your OTP is :${otp}` )
response.json({message:"Otp Sent Successfully",count:user.otpRequestCount,})
  } catch (error) {
     console.log(error)
    response.status(500).json({message:"Internal Server Error !"})
  }
}
//TODO:MY-INFO
async function myInfo(request,response){
try {
  const id= request.user._id 
  const user=await User.findById({id})
if(!user){
 return  response.status(400).json({message:"UserNot Found"})
}

} catch (error) {
  console.log(error)
  response.status(500).json({message:"Internal Server Error"})
}
}


module.exports = { register ,login,verifyOtp,resendOtp,myInfo};








