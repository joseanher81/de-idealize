const express = require("express");
const router = express.Router();

// Use routes
const auth = require("./auth");
router.use("/", auth);
const game = require("./game");
router.use("/", game);
const user = require("./user");
router.use("/", user);
const question = require("./question");
router.use("/", question);
const chat = require("./chat");
router.use("/", chat);

module.exports = router;
