require("dotenv").config();

const express = require("express");
const session = require("express-session");
const authRouter = require("./routes/authRoute");
const multerRouter = require("./routes/multerRoute");
const sequelize = require("./config/dbConfig");

const app = express();
app.use(express.urlencoded());
app.use(express.json());

//-------session middleware---------
app.use(
  session({
    secret: process.env.SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
    },
  })
);
async function createServer() {
  await sequelize.sync();

  app.use("/", multerRouter);
  app.use("/auth", authRouter);

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
