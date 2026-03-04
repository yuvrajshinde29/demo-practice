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

authRouter.post("/signup", createUser);
// authRouter.route("/signin").post(signin)
authRouter.post(
  "/signin",
  passport.authenticate("local", {
    session: false,
    // successRedirect: "/user",
    failureRedirect: "/",
  }),
  signin,
);
authRouter.post("/forgot-password", forgotPassword);
authRouter.patch("/forgot-password/:token", resetPassword);
authRouter.get("/logout", authMiddleware, logOut);

module.exports = authRouter;
