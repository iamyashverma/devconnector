const express = require("express");
const router = express.Router();

// @route   /api/auth
// @desc    handle users
// @access public

router.get("/", (req, res) => res.send("auth API route"));

module.exports = router;
