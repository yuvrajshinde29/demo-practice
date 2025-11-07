const LocalStartgey = require("passport-local");
const passport = require("passport");

const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        if (! await bcrypt.compare(password, user.password))
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
 

//------------------------------------passoprt-jwt------------------------------------------

const { Strategy: JWTStartgey, ExtractJwt } = require("passport-jwt");

//options to tell passport-jwt where to find token and which key to use
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //looks for Bearer <token>
  secretOrKey: process.env.JWT_SECRET,
};

//verify callback - run whenever request hit to protected route
passport.use(
  new JWTStartgey(opts, async (jwt_payload, done) => {
    try {
      //get user data from db
      const id = jwt_payload.sub
      const user = await User.findOne({where:{
        id
      }});

      if(user) return done(null,user)         //success attch user to req.user
        else return  done(null,false,{error:'unauthorized | invalid user'}) // no user -> unauthorized

    } catch (error) {
      console.log(error.messsage);
      resizeBy.status(500).json({ error: error.messsage });
    }
  })
);

//export passport so app can initialize
module.exports = passport