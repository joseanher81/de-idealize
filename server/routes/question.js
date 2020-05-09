const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../models/question");
const Game = require("../models/game");

// Get a question not asked yet
router.get("/question/get/:gameid", async (req, res, next) => {
  try {
    // Get current game
    const currentGame = await Game.findById(req.params.gameid);
    console.log("GAME FOUND " + currentGame.matchPercent);

    // Get a question not asked yet
    let qIdObjects = currentGame.questions.map((s) =>
      mongoose.Types.ObjectId(s)
    );

    // Get a random question not asked yet
    const size = await Question.count({
      _id: { $nin: qIdObjects },
    });

    const question = await Question.findOne({
      _id: { $nin: qIdObjects },
    }).skip(Math.random() * size);

    console.log("Question found: " + question);

    res.json({ status: "ok", question: question });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = router;
