const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getMyBooks,
  getBooks,
  editBook,
  deleteBook,
  addBook,
  getPublic,
  getPrivate,
  getPublicId,
  getPrivateId,
  getBookById,

} = require("../controllers/bookController.js");
const {protect} = require('../middleware/authMiddleware.js')

router.get("/", (req, res) => {
  res.send("Routes Connected Successfully...");
});

router.get('/publicBooks',protect ,getPublic);

router.get('/privateBooks',protect , getPrivate);

router.get('/publicBooksId',protect ,getPublicId);

router.get('/privateBooksId',protect , getPrivateId);

router.get("/myBooks",protect, getMyBooks);

router.get("/allBooks", getBooks);

router.get("/BookById/:id", getBookById);

router.post("/addBook", protect, addBook);

router.put("/editBook/:id", protect, editBook);

router.delete("/delBook/:bookId", protect, deleteBook);

module.exports = router;
