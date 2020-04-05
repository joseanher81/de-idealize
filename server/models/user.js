const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, index: true, unique: true, required: true },
    password: String,
    picturesUrl: [String],
    blacklist: [{ type: Schema.Types.ObjectId, ref: "User" }],
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    currentGame: { type: Schema.Types.ObjectId, ref: "Game" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
