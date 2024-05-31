const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).send("Access Denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// };

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  // Ensure the token is in the format "Bearer <token>"
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).send("Access Denied. Invalid token format.");
  }

  const actualToken = tokenParts[1];

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
