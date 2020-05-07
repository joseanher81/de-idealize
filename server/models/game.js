const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    playerTurn: String,
    matchPercent: { type: Number, default: 100 },
    playerA: { type: Schema.Types.ObjectId, ref: "User" },
    playerB: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    status: { type: String, enum: ["PLAYING", "MATCHED", "WAITING"], default: "WAITING" },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
