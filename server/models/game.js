const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    playerTurn: String,
    matchPercent: { type: Number, default: 100 },
    playerA: { type: Schema.Types.ObjectId, ref: "User" },
    playerB: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "User" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    status: { type: String, enum: ["Playing", "Matched"] },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
