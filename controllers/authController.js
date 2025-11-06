const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  validateUserSchema,
  validateUserPassword,
  validateSignin,
} = require("../utils/UserValidation");
const sendEmail = require("../config/nodemailer");
const { Op } = require("sequelize");

// user signup :/auth/signup
exports.createUser = async (req, res) => {
  try {
    let { value, error } = validateUserSchema(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    value.password = await bcrypt.hash(
      value.password,
      Number(process.env.BECRYPT_SALTS)
    );

    console.log(value);
    const user = await User.create(value);

    if (!user) {
      return res
        .status(500)
        .json({ error: "Something went wrong! unable to signup" });
    }

    res.status(201).json({ message: "signup completed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// :auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    let user = await User.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) return res.status(404).json({ error: "user not found" });

    //generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 10;

    await user.save();
    // reset url
    const resetUrl = process.env.CLIENT_URL + "/" + resetToken;

    let PreviewURL = await sendEmail(resetUrl, user.email);
    res
      .status(200)
      .json({ message: "password reset link sent to your email", PreviewURL });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

//reset password:/auth/forgot-password/token
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    let { value, error } = validateUserPassword(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpire: { [Op.gt]: Date.now() },
      },
    });

    if (!user)
      return res.status(404).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(
      value.password,
      Number(process.env.BECRYPT_SALTS)
    );
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();
    //redirect to login page
    res.status(200).json({ message: "password reset done" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

//signin /auth/signin
/* exports.signin = async (req, res) => {
  try {
    let { value, error } = validateSignin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ where: { email: value.email } });
    if (!user)
      return res.status(404).json({ error: "Invalid user! first signup " });

    let isValidUser = await bcrypt.compare(value.password, user.password);

    if (!isValidUser) return res.status(401).json({ error: "wrong password" });

    res.status(200).json({ message: "signin successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}; */

exports.logOut = (req, res) => {
  /* req.session.destroy((err) => {
    if (err) res.status(401).json({ error: "unable to distroy session" });
    res.clearCookie("connect.sid");
    return res.json({ message: "logout success" });
  }); */

  req.logOut(() => {
    res.json({ message: "logged out successfully" });
  });
};
