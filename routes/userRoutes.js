const express = require("express");
const { showProfile } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/profile", showProfile);

module.exports = userRouter;

