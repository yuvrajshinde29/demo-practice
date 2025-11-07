const express = require("express");
const {
  logOut,
  createUser,
  forgotPassword,
  resetPassword,
  signin,
} = require("../controllers/authController");
const passport = require("../config/passport");
const authMiddleware = require("../config/authMiddleware");
const { showProfile } = require("../controllers/userController");
const authRouter = express();

authRouter.route("/signup").post(createUser);
// authRouter.route("/signin").post(signin)
authRouter.route("/signin").post(
  passport.authenticate("local", {
    session:false,
    // successRedirect: "/user",
    failureRedirect: "/",
  }),
  signin
);
// authRouter.route("/signin").post(passport.authenticate("local"), showProfile);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/forgot-password/:token").patch(resetPassword);
authRouter.route("/logout").get(authMiddleware, logOut);

module.exports = authRouter;
