const db = require("../config/database");

const Book = {
  create: (data, callback) => {
    const query =
      "INSERT INTO books (seller_id, title, author, publishedDate, price) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [data.seller_id, data.title, data.author, data.publishedDate, data.price],
      callback
    );
  },
  findBySellerId: (sellerId, callback) => {
    const query = "SELECT * FROM books WHERE seller_id = ?";
    db.query(query, [sellerId], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM books";
    db.query(query, callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM books WHERE id = ?";
    db.query(query, [id], callback);
  },
  updateById: (id, data, callback) => {
    const query =
      "UPDATE books SET title = ?, author = ?, publishedDate = ?, price = ? WHERE id = ? AND seller_id = ?";
    db.query(
      query,
      [
        data.title,
        data.author,
        data.publishedDate,
        data.price,
        id,
        data.seller_id,
      ],
      callback
    );
  },
  deleteById: (id, sellerId, callback) => {
    const query = "DELETE FROM books WHERE id = ? AND seller_id = ?";
    db.query(query, [id, sellerId], callback);
  },
};

module.exports = Book;
