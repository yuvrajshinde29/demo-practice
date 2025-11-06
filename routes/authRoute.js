const express = require("express");
const {
  logOut,
  createUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const passport = require("passport");
const authMiddleware = require("../config/authMiddleware");
const { showProfile } = require("../controllers/userController");
const authRouter = express();

authRouter.route("/signup").post(createUser);
// authRouter.route("/signin").post(signin)
authRouter.route("/signin").post(
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/",
  })
);
// authRouter.route("/signin").post(passport.authenticate("local"), showProfile);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/forgot-password/:token").patch(resetPassword);
authRouter.route("/logout").get(authMiddleware, logOut);

module.exports = authRouter;
