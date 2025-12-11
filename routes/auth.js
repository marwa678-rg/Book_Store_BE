
//Imports
const express=require("express")
//Internal Imports
const {register,login,verifyOtp,resendOtp, myInfo}=require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth.middleware");

const router =express.Router();


//TODO:REGISTER
router.post("/register",register)
//TODO:LOGIN
router.post("/login",login)

//TODO:VERIFY-OTP
router.post("/verify-otp",verifyOtp)

//TODO:RESEND-OTP
router.post("/resend-otp",resendOtp)

//TODO:MY-INFO
router.get("/myInfo",authMiddleware,myInfo)
module.exports = router;