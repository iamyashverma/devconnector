const express = require("express");
const router = express.Router();

// @route   /api/profile
// @desc    handle users
// @access public

router.get("/", (req, res) => res.send("profile API route"));

module.exports = router;
