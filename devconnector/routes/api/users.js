const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

const User = require("../../models/User");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] }); // we are using array for errors to be same as the express- validator , just for consistency.
      }

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // create a user avatar
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // save user in the database

      // return jsonwebtoken -> for logging in users upon registration

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
