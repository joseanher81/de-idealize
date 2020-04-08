const express = require("express");
const router = express.Router();
const passport = require("passport");
const { hashPassword } = require("../lib/hashing");
const User = require("../models/user");

// Signup
router.post("/auth/signup", async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      age,
      gender,
      location,
      lookingFor,
      minAge,
      maxAge,
    } = req.body; // TODO Add pictures

    if (!username || !password) {
      res.status(400).json({ error: "Provide username and password" });
    }

    const registeredUser = await User.findOne({ username });

    if (registeredUser) {
      console.log(`User ${registeredUser.username} already exists`);
      res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = await User.create({
        username,
        email,
        age,
        gender,
        location,
        lookingFor,
        minAge,
        maxAge,
        password: hashPassword(password),
      });

      // Directly login user
      req.logIn(newUser, (err) => {
        if (err)
          res
            .status(500)
            .json({ status: "error", message: "Error login after signup" });
        res.json({ status: "ok", user: req.user.toJSON() });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error creating user" });
  }
});

// Login user
router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  return res.json({ status: "ok", user: req.user.toJSON() });
});

// Edit user
/* router.post("/auth/edit", async (req, res, next) => {
  try {
    const { username, campus, course } = req.body;
    res.json(`User updated ${username} ${campus} ${course}`);
  } catch (error) {
    console.log(error);
  }
}); */

// Logout
router.post("/auth/logout", async (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.json({ status: "ok", message: "Log out success" });
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "You have to be logged in to logout" });
  }
});

// Logedin
router.get("/auth/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ status: "ok", user: req.user.toJSON() });
    return;
  }
  res.status(403).json({ status: "error", message: "Unauthorized" });
});

module.exports = router;
