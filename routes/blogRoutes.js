const express = require("express");
const Blog = require("../models/Blog");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create blog
router.post("/", protect, async (req, res) => {
  const blog = await Blog.create({ ...req.body, user: req.user });
  res.json(blog);
});

// Get all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("user", "name");
  res.json(blogs);
});

// Get single blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", "name");
  res.json(blog);
});

// Update blog
router.put("/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user) return res.status(401).json({ msg: "Not authorized" });
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete blog
router.delete("/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user) return res.status(401).json({ msg: "Not authorized" });
  await blog.deleteOne();
  res.json({ msg: "Blog deleted" });
});

// Test route
router.get("/", (req, res) => {
  res.send("Blog API is working 🚀");
});

module.exports = router;
