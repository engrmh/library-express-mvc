const express = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(bookController.getAll)
  .post(bookController.addNewBook);

bookRouter
  .route("/:id")
  .get(bookController.getOne)
  .delete(bookController.deleteOne)
  .put(bookController.updateBook);

module.exports = bookRouter;
