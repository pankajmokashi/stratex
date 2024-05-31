const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const dotenv = require("dotenv");

dotenv.config();

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create(
    { name, email, password: hashedPassword, role },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("User registered successfully.");
    }
  );
};

exports.registerSeller = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  Seller.create(
    { name, email, password: hashedPassword, role },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Seller registered successfully.");
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await new Promise((resolve, reject) => {
      User.findByEmail(email, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });

    const seller = await new Promise((resolve, reject) => {
      Seller.findByEmail(email, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });

    const account = user || seller;
    if (!account) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = jwt.sign(
      { id: account.id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
