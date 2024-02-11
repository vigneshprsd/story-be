// src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username, password });
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id , isAdmin : user.isAdmin, username: user.username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user.id , isAdmin : user.isAdmin, username: user.username }  };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login };
