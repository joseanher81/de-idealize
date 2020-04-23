const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../models/question");
const Game = require("../models/game");

// Get a question not asked yet
router.get("/question/get/:gameid", async (req, res, next) => {
  try {
    console.log("Se busca juego " + req.params.gameid);
    // Get current game
    const currentGame = await Game.findById(req.params.gameid);
    console.log("GAME FOUND " + currentGame.matchPercent);

    // Get a question not asked yet
    let qIdObjects = currentGame.questions.map((s) =>
      mongoose.Types.ObjectId(s)
    );

    console.log("QIOBJECTS " + qIdObjects);

    // Get a random question not asked yet
    const size = await Question.count({
      _id: { $nin: qIdObjects },
    });

    console.log("Size is " + size);

    const question = await Question.findOne({
      _id: { $nin: qIdObjects },
    }).skip(Math.random() * size);

    console.log("Pregunta encontrada: " + question);

    res.json({ status: "ok", question: question });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = router;
