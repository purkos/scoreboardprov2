const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const user = new User(username, password);
  const saved = await user.save();
  if (saved) {
    res.json({ message: "Registration successful" });
  } else {
    res.status(500).json({ error: "Failed to register user" });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find the user in the database
    const user = await User.findByUsername(username);
    // Log user information (for debugging purposes)

    // Check if the user exists and the password is correct
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a JWT and send it
    const token = jwt.sign(
      { username: user.username, userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ token: token, userData: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
