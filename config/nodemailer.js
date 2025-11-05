const nodemailer = require("nodemailer");

async function sendEmail(resetPasswordUrl, toUser) {
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

  transpoter.verify((err, success) => {
    if (err) return console.log("email server connection failed", err);
    console.log("email server ready to send message");
  });

  //2. define email content
  const mailOptions = {
    from: `"Demo Nodemailer" <${testAccount.user}>`,
    to: toUser,
    subject: "testing nodemailer",
    text: `Hello,
    Click this link to reset password, 
    // ${resetPasswordUrl}`,
    // html: `<h1>Welcome</h1><p>that was easy!</p>
    // <table style="border:1px solid black">
    
    //   <tr style="border:1px solid black"><th>id</th> <th>name</th><th>email</th></tr>
    //   <tr style="border:1px solid black">
    //   <td >a</td>aa<td></td>aa<td></td>
    //   </tr>
    //   <tr style="border:1px solid black">
    //   <td>b</td><td>bb</td>bbb<td></td>
    //   </tr>
    // </table>
    // `,
    attachments: [
      { filename: "data.json", content: "JSON.stringify({ name: 'Yuvraj' })" },
    ],
  };

  //send the email
  const info = await transpoter.sendMail(mailOptions);
  console.log("Email sent: ", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info);
}

module.exports = sendEmail;
