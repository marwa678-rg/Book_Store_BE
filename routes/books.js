//Imports
const express= require("express");
const router = express.Router();
//Internal imports
const {getALLBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");
const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");




//TODO:GET ALL BOOKS
router.get("/",getALLBooks)
//TODO:GET SINGLE BOOK
router.get("/:id",getSingleBook)
//TODO:Add BOOK
router.post("/add",authMiddleware,roleMiddleware("admin"),addNewBook)
//TODO:Update
router.put("/update/:id",authMiddleware,roleMiddleware("admin"),updateBook)
//TODO:DELETE
router.delete("/delete/:id",authMiddleware,roleMiddleware("admin"),deleteBook)



module.exports = router;
