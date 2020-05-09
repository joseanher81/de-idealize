const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/game");

router.post("/chat/savemsg", async (req, res, next) => {
  console.log("Add a question to game");

  try {
    const { gameid, playerType, msg } = req.body;

    // Get current game
    const currentGame = await Game.findById(gameid);
    console.log("GAME FOUND " + currentGame.id);

    // Get its chat
    const chat = await Chat.findById(currentgame.chat);
    console.log("CHAT FOUND " + chat.id);

    // Save msg on corresponding array
    if(playerType === A) {
      chat.playerAmessages.push(msg);
    } else {
      chat.playerBmessages.push(msg);
    }

    // Save chat
    chat.save();

    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = router;
