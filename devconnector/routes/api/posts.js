const express = require("express");
const router = express.Router();

// @route   /api/posts
// @desc    handle users
// @access public

router.get("/", (req, res) => res.send("posts API route"));

module.exports = router;
