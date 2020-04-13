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
  //console.log("Usuario que vuelve: " + currentUser);

  // Try to find a suitable match
  const { lookingFor, minAge, maxAge, username, age, gender } = currentUser;
  const matchedUser = await User.findOne({
    $and: [
      {
        minAge: {
          $lte: age,
        },
      },
      {
        maxAge: {
          $gte: age,
        },
      },
      {
        lookingFor: gender,
      },
      {
        age: {
          $lte: maxAge,
        },
      },
      {
        age: {
          $gte: minAge,
        },
      },
      {
        gender: lookingFor,
      },
      {
        currentGame: null,
      },
      {
        username: {
          $ne: username,
        },
      },
    ],
  });

  console.log("Usuario encontrado: " + matchedUser);

  // Create game
});

module.exports = router;
