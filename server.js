const express = require("express");
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/seller", authMiddleware, sellerRoutes);
app.use("/user", authMiddleware, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
