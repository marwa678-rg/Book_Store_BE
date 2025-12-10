const router = require("express").Router();

const { buyBook, getPurchases } = require("../controllers/purchaseController");

router.post("/:bookId",buyBook);
router.get("/",getPurchases);

module.exports = router;
