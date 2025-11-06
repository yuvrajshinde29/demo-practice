const LocalStartgey = require("passport-local");
const User = require("../models/User");
const bcrypt = require('bcrypt')
module.exports = (passport) => {
  passport.use(
    new LocalStartgey(
      { usernameField: "email" },
      async (email, password, done) => {

        //validate user input

        //fetch user from db
        const user = await User.findOne({
          where: {
            email,
          },
        });
        // console.log(user, ": 1");
        if (!user) return done(null, false, { message: "first log in" });
        //check password
        if (bcrypt.compareSync(password, user.password))
          return done(null, false, { message: "invalid password" });

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null,{id: user.id});
  });

  passport.deserializeUser((user, done) => {
    done(null, {id: user.id});
  });
};
