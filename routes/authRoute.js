const express = require("express");
const { userLogin, getUser, logOut } = require("../controllers/authController");
const authRouter = express();

authRouter.route("/").post(userLogin).get(getUser);
authRouter.route("/logout").get(logOut);

module.exports = authRouter;
