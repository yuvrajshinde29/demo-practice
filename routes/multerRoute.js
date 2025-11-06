const express = require("express");
const { uploadFile } = require("../controllers/multerController");
const upload = require("../config/multerFileStorageConfig");
const multerRouter = express();

multerRouter.route("/").get((req, res) => {
  res.send("home, need to login first");
});
multerRouter.route("/upload").post(upload.single("fileName"), uploadFile);

module.exports = multerRouter;
