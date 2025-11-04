const nodemailer = require("nodemailer");

async function sendEmail(resetPasswordUrl) {
  //create test account
  const testAccount = await nodemailer.createTestAccount();
  console.log("test Account: ", testAccount);

  //1. create a transpoter(connect to email service)
  const transpoter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  //2. define email content
  const mailOptions = {
    from: `"Demo Nodemailer" <${testAccount.user}>`,
    to: "testuser@gmail.com",
    subject: "testing nodemailer",
    text: `Hello,
    Click this link to reset password, ${resetPasswordUrl}`,
  };

  //send the email
  const info = await transpoter.sendMail(mailOptions);
  console.log("Email sent: ", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info)
}

module.exports = sendEmail;
