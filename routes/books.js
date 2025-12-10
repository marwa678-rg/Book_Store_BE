const router = require("express").Router();

const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.route("/").get(getBooks).post(createBook);

router.route("/:id").put(updateBook).delete(deleteBook);

module.exports = router;
