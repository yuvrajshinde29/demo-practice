exports.uploadFile = (req, res) => {
  //fileNmae - must be same as input field name of UI form
  console.log("=", req.file); //file info
  res.json(req.file);
};
