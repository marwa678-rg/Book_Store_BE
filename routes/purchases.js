
//Imports
const express = require("express")
const router= express.Router();
const{buyBook,getMyPurchases}=require("../controllers/purchaseController")

//InternalImports
const{authMiddleware}=require("../middleware/auth.middleware")

//TODO:Buy book
router.post("/:bookId",authMiddleware,buyBook )

//TODO:MY PURCHASE
router.get("/my",authMiddleware,getMyPurchases)


module.exports=router;