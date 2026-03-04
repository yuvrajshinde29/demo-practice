const multer = require("multer");

const storage = multer.diskStorage({//storage is storage engine object that tell multer where and how store incoming files
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //folder to store file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //rename file so name will unique
  },
});
//filter file types
const allowedTypes = new Set([
  'image/jpeg',
  'image/png',
]);

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.has(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG images are allowed'), false);
  }

  cb(null, true);
};



// Use memory storage instead of disk
// const storage = multer.memoryStorage();
//now you can access file in route req.file and actual file bytes are stored in req.file.buffer

const upload = multer({storage, fileFilter})    //return a multer object we use as middleware tipically calling methods on it  

// you can use:
// upload.single('fieldName') → upload one file
// upload.array('fieldName', count) → multiple files
// upload.fields([...]) → different fields

module.exports = upload;

