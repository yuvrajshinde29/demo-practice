const User = require("../models/User");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!User[0].email === email)
    return res.status(401).json({ error: "Invalid user" });

  if (!password === User[0].password)
    return res.status(400).json({ error: "Invalid password" });
  //-----------------------

  req.session.user = User[0];

  res.status(200).json({ msg: "login success", user: req.session.user });
};

exports.getUser = async (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.status(200).json({ msg: "user info", user });
};

exports.logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(401).json({ error: "unable to distroy session" });

    res.clearCookie("connect.sid");

    return res.json({ message: "logout success" });
  });

  
};
