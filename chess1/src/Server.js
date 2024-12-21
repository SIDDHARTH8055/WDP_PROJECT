const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Secret Key for JWT
const JWT_SECRET = "your_secret_key";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chessGameDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered!" });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error while signing up!" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error while logging in!" });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

// Leaderboard Route (Protected)
app.get("/leaderboard", authenticateToken, async (req, res) => {
  try {
    const players = await User.find()
      .sort({ score: -1 })
      .select("username score");

    res.status(200).json(players);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching leaderboard!" });
  }
});

// Start Server
app.listen(4010, () => {
  console.log("Server running on http://localhost:4010");
});
