const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// @route   GET/api/users
// @desc    handle users
// @access public

// router.get("/", (req, res) => res.send("users API route"));

// @route POST /api/users
// desc     Register Users

router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Enter a valid Email address").isEmail(),
    body(
      "password",
      "The lenght of the password must be between 6 and 20 characters"
    ).isLength({ min: 6, max: 20 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("USer route");
  }
);

module.exports = router;
