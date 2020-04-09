const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, index: true, unique: true, required: true },
    password: String,
    email: { type: String, unique: true },
    image1: Object,
    image2: Object,
    image3: Object,
    age: Number,
    gender: { type: String, enum: ["Male", "Female"] },
    location: String,
    lookingFor: { type: String, enum: ["Male", "Female", "Both"] },
    minAge: Number,
    maxAge: Number,
    blacklist: [{ type: Schema.Types.ObjectId, ref: "User" }],
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    currentGame: { type: Schema.Types.ObjectId, ref: "Game" },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
