const sendEmail = require("../config/nodemailer");

exports.sendUserDetails = async (req, res) => {
  await sendEmail();
  res.send("email sent");
};
