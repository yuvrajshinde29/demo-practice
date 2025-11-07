const passport = require("../config/passport");

module.exports = passport.authenticate("jwt", { session: false });

// module.exports = (req, res, next) =>{
//   if (!req.isAuthenticated())
//     return res.status(401).json({ error: "Access denied" });
//   next();
// };
