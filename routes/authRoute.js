const express = require("express");
const { logOut, createUser, forgotPassword, resetPassword, signin } = require("../controllers/authController");
const authRouter = express();

authRouter.route("/signup").post(createUser)
authRouter.route("/signin").post(signin)
authRouter.route("/forgot-password").post(forgotPassword)
authRouter.route("/forgot-password/:token").patch(resetPassword)
// authRouter.route("/logout").get(logOut);

module.exports = authRouter;
 