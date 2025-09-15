const express = require("express");
const Blog = require("../models/Blog");
const protect = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

// Get blogs for the logged-in user
router.get("/me", protect, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user }).populate("user", "name");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Toggle bookmark for a blog
router.post("/:id/bookmark", protect, async (req, res) => {
  try {
    const blogId = req.params.id;
    const me = await User.findById(req.user);
    if (!me) return res.status(404).json({ msg: "User not found" });

    const idx = me.bookmarks.findIndex(b => b.toString() === blogId);
    let action;
    if (idx >= 0) {
      me.bookmarks.splice(idx, 1);
      action = "removed";
    } else {
      me.bookmarks.push(blogId);
      action = "added";
    }
    await me.save();
    res.json({ msg: `Bookmark ${action}`, bookmarks: me.bookmarks });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get bookmarked blogs for logged-in user
router.get("/bookmarked", protect, async (req, res) => {
  try {
    const me = await User.findById(req.user).populate({
      path: "bookmarks",
      populate: { path: "user", select: "name" }
    });
    if (!me) return res.status(404).json({ msg: "User not found" });
    res.json(me.bookmarks || []);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create blog
router.post("/", protect, async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, user: req.user });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name");
    if (req.user) {
      // If protect middleware ran earlier in a global use-case, but here it's open, we won't have req.user.
      // Keep behavior simple: if req.user present, add bookmarked flag from their list.
      try {
        const me = await User.findById(req.user).select("bookmarks");
        const bookmarkedSet = new Set((me?.bookmarks || []).map(b => b.toString()));
        return res.json(blogs.map(b => ({
          ...b.toObject(),
          bookmarked: bookmarkedSet.has(b._id.toString())
        })));
      } catch (_) {
        // fallback to plain list
      }
    }
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "name");
    if (!blog) return res.status(404).json({ msg: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Update blog
router.put("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Not found" });
    if (blog.user.toString() !== req.user) return res.status(401).json({ msg: "Not authorized" });
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Delete blog
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Not found" });
    if (blog.user.toString() !== req.user) return res.status(401).json({ msg: "Not authorized" });
    await blog.deleteOne();
    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Remove duplicate root test route; root is used for listing blogs

module.exports = router;
