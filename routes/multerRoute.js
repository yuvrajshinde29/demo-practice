const express = require("express");
const { uploadFile } = require("../controllers/multerController");
const upload = require("../config/multerFileStorageConfig");
const multerRouter = express();


multerRouter.route('/').post( upload.single("fileName"),uploadFile)

module.exports = multerRouter