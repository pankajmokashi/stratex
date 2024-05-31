const Book = require("../models/bookModel");
const csv = require("fast-csv");
const fs = require("fs");

exports.uploadBooks = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const books = [];
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("data", (row) => {
      books.push({
        seller_id: req.user.id, // Assuming req.user.id is the seller's ID from the auth middleware
        title: row.title,
        author: row.author,
        publishedDate: row.publishedDate,
        price: row.price,
      });
    })
    .on("end", async () => {
      // Insert books into the database
      try {
        for (const book of books) {
          await new Promise((resolve, reject) => {
            Book.create(book, (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
        res.status(201).send("Books uploaded successfully.");
      } catch (error) {
        res.status(500).send("Error uploading books.");
      }
    });
};

exports.getSellerBooks = (req, res) => {
  Book.findBySellerId(req.user.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;

  Book.updateById(
    bookId,
    { ...bookData, seller_id: req.user.id },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).send("Book not found or unauthorized.");
      res.send("Book updated successfully.");
    }
  );
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.deleteById(bookId, req.user.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Book not found or unauthorized.");
    res.send("Book deleted successfully.");
  });
};
