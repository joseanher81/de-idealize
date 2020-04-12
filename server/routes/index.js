const express = require("express");
const router = express.Router();

// Use routes
const auth = require("./auth");
router.use("/", auth);
const game = require("./game");
router.use("/", game);

module.exports = router;
