const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/books", userController.getAllBooks);
router.get("/books/:id", userController.getBookById);

module.exports = router;
