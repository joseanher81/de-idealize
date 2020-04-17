const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    playerTurn: String,
    turnTime: { type: Number, default: 599 },
    matchPercent: { type: Number, default: 100 },
    stage: { type: Number, default: 0 },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    playerA: { type: Schema.Types.ObjectId, ref: "User" },
    playerB: { type: Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
