const Book = require("../models/bookModel");

exports.getAllBooks = (req, res) => {
  Book.findAll((err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

exports.getBookById = (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send("Book not found.");
    res.send(result[0]);
  });
};
