const express = require("express");
const router = express.Router();
const passport = require("passport");
const { hashPassword } = require("../lib/hashing");
const User = require("../models/user");
const { uploadCloudinaryAvatar } = require("./../middleware/uploader");

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
      image1,
      image2,
      image3,
    } = req.body;

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
        image1,
        image2,
        image3,
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

// Upload photo
router.post(
  "/profilepic",
  uploadCloudinaryAvatar.single("image"),
  async (req, res) => {
    console.log(req.file);

    return res.json({ status: "ok", file: req.file });
  }
);

// Login user
router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  return res.json({ status: "ok", user: req.user.toJSON() });
});

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
