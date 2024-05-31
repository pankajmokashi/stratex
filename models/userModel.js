const db = require("../config/database");

const User = {
  create: (data, callback) => {
    const query =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [data.name, data.email, data.password, data.role],
      callback
    );
  },
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },
};

module.exports = User;
