const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Game = require("../models/game");

// New Game
router.post("/game/new", async (req, res, next) => {
  console.log("Starting new game");

  // Get current player
  const { userid } = req.body;
  const currentUser = await User.findById(userid);

  // Try to find a suitable match

  // Create game

  if (req.user) {
    req.logout();
    return res.json({ status: "ok", message: "Log out success" });
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "You have to be logged in to logout" });
  }
});
