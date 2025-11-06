require("dotenv").config();

const express = require("express");
const session = require("express-session");
const authRouter = require("./routes/authRoute");
const multerRouter = require("./routes/multerRoute");
const sequelize = require("./config/dbConfig");
const ConfigurePassport = require("./config/passport");
const passport = require("passport");
const userRouter = require("./routes/userRoutes");
const authMiddleware = require("./config/authMiddleware");

// const passport = require("passport");

const app = express();
app.use(express.urlencoded());
app.use(express.json());

//-------session middleware---------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
ConfigurePassport(passport);

async function createServer() {
  await sequelize.sync();

  app.use("/", multerRouter);
  app.use("/auth", authRouter);
  app.use(
    "/user",
    authMiddleware,
    userRouter
  );

  app.listen(3000, () => {
    console.log("server started...");
  });
}
createServer();

/*output = {
  fieldname: 'fileName',
  originalname: 'wallpaperflare.com_wallpaper.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads',
  filename: '1761740203629-wallpaperflare.com_wallpaper.jpg',
  path: 'uploads\\1761740203629-wallpaperflare.com_wallpaper.jpg',
  size: 309586
} */
