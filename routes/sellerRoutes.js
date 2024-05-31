const express = require("express");
const router = express.Router();
const multer = require("multer");
const sellerController = require("../controllers/sellerController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), sellerController.uploadBooks);
router.get("/books", sellerController.getSellerBooks);
router.put("/books/:id", sellerController.updateBook);
router.delete("/books/:id", sellerController.deleteBook);

module.exports = router;
