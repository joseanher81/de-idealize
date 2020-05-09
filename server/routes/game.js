const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Game = require("../models/game");
const Question = require("../models/question");
const Message = require("../models/message");

// New Game
router.post("/game/new", async (req, res, next) => {
  console.log("Starting new game");

  try {
    // Get current player
    const { userid } = req.body;
    const currentUser = await User.findById(userid);

    // Need to find a not blacklisted user
    let qIdObjectsBlacklist = currentUser.blacklist.map((s) => mongoose.Types.ObjectId(s));

    // Try to find a suitable match
    const { lookingFor, minAge, maxAge, username, age, gender, location } = currentUser;
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
          location: location,
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
          _id: { 
            $nin: qIdObjectsBlacklist, 
          },
        },
        {
          username: {
            $ne: username,
          },
        },
      ],
    });

    console.log("User found: " + matchedUser);

    const newGame = await Game.create({
      playerTurn: userid,
      playerA: currentUser._id,
      playerB: matchedUser._id,
    });

    // Add game to players
    currentUser.currentGame = newGame._id;
    await currentUser.save();
    matchedUser.currentGame = newGame._id;
    await matchedUser.save();

    res.json({
      status: "ok",
      game: newGame,
      playerA: currentUser,
      playerB: matchedUser,
    });
  } catch (error) {
    console.log("ERROR CREATING NEW GAME " + error);
  }
});

// Get current game
router.get("/game/get", async (req, res, next) => {
  try {
    // Get game from current player
    const currentUser = await User.findById(req.user).populate("currentGame");
    console.log("Game found: " + currentUser.currentGame);
    res.json({ status: "ok", game: currentUser.currentGame });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Save a question to question array in game
router.post("/game/addquestion", async (req, res, next) => {
  console.log("Add a question to game");

  try {
    const { gameid, questionid } = req.body;

    // Get current game
    const currentGame = await Game.findById(gameid);
    console.log("GAME FOUND " + currentGame.id);

    // Get the question
    const currentCuestion = await Question.findById(questionid);
    console.log("QUESTION FOUND " + currentCuestion.id);

    // Save question to current game
    currentGame.questions.push(currentCuestion);
    currentGame.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Save a message to messages array in game
router.post("/game/addmessage", async (req, res, next) => {
  console.log("Add a message to game");

  try {
    const { gameid, message, userid } = req.body;

    // Get current game
    const currentGame = await Game.findById(gameid);
    console.log("GAME FOUND " + currentGame.id);

    // Get user
    const currentUser = await User.findById(userid);
    console.log("USER FOUND " + currentUser.id);

    // Create message
    const newMessage = await Message.create({
      text: message,
      user: currentUser,
    });

    // Save question to current game
    currentGame.messages.push(newMessage);
    currentGame.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Get messages from game
router.get("/game/messages/:gameid", async (req, res, next) => {
  try {
    // Get current game
    const currentGame = await Game.findById(req.params.gameid).populate("messages");
    console.log("MESSAGES "+ currentGame)
    res.json({ status: "ok", messages: currentGame.messages });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Change game status
router.post("/game/setstatus", async (req, res, next) => {
  console.log("Change game status");

  try {
    const { gameid, status } = req.body;

    // Get current game
    let currentGame = await Game.findByIdAndUpdate(
      gameid,
      {
        status: status,
      },
      { new: true }
    );
    console.log("GAME FOUND AND UPDATED " + currentGame.id);

    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Save Match percentage
router.post("/game/setmatch", async (req, res, next) => {
  console.log("Save match percentage");

  try {
    const { gameid, match } = req.body;

    // Get current game
    let currentGame = await Game.findByIdAndUpdate(
      gameid,
      {
        matchPercent: match,
      },
      { new: true }
    );
    console.log("GAME FOUND AND UPDATED " + currentGame.id);

    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = router;
