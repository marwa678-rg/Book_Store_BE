
//Imports
const express=require("express")
//Internal Imports
const {register,login,verifyOtp}=require("../controllers/authController")

const router =express.Router();


//TODO:REGISTER
router.post("/register",register)
//TODO:LOGIN
router.post("/login",login)

//TODO:VERIFY-OTP
router.post("/verify-otp",verifyOtp)




module.exports = router;