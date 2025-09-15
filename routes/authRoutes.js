const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const protect = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  const { name, email, password } = (req.body ?? req.query ?? {});
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "name, email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });
    const user = await User.create({ name, email, password });
    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = (req.body ?? req.query ?? {});
    if (!email || !password) return res.status(400).json({ msg: "email and password are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken({ id: user._id });
    const safeUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Test route
router.get("/", (req, res) => {
  res.send("Auth API is working 🚀");
});

// Get logged-in user info
router.get("/me", protect, async (req, res) => {
  try {
    const me = await User.findById(req.user).select("_id name email bio profilePic");
    if (!me) return res.status(404).json({ msg: "User not found" });
    res.json(me);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
