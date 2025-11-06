const express = require("express");
const { showProfile } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/").get(showProfile);

module.exports = userRouter;

// authRouter.route("/profile").get((req, res) => {
//   res.send("User Profile login successfull");
// });
// authRouter.route("/home").get((req, res) => {
//   res.send("login failed");
// });
