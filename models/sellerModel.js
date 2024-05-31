const db = require("../config/database");

const Seller = {
  create: (data, callback) => {
    const query =
      "INSERT INTO sellers (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [data.name, data.email, data.password, data.role],
      callback
    );
  },
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM sellers WHERE email = ?";
    db.query(query, [email], callback);
  },
};

module.exports = Seller;
