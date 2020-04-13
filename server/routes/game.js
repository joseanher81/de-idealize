const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Game = require("../models/game");
const Chat = require("../models/chat");

// New Game
router.post("/game/new", async (req, res, next) => {
  console.log("Starting new game");

  try {
    // Get current player
    const { userid } = req.body;
    const currentUser = await User.findById(userid);

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
    const newChat = await Chat.create({});

    const newGame = await Game.create({
      playerTurn: userid,
      chat: newChat,
      playerA: currentUser,
      playerB: matchedUser,
    });

    // Add game to players
    currentUser.currentGame = newGame;
    currentUser.save();
    matchedUser.currentGame = newGame;
    matchedUser.save();

    res.json({ status: "ok", game: newGame.toJSON() });
  } catch (error) {
    console.log("ERROR CREATING NEW GAME " + error);
  }
});

module.exports = router;
