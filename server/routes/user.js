const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get user by id
router.get("/user/get/:userid", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);

    console.log("Usuario encontrado: " + user.currentGame);
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

// Save socket id
router.post("/user/saveSocketId", async (req, res, next) => {
  try {
    const { userid, socketid } = req.body;

    // Find user and updat its socketid
    const user = await User.findByIdAndUpdate(userid, { socketId: socketid });
    console.log("SocketId: " + user);
    res.json({ status: "ok", user: user });
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = router;