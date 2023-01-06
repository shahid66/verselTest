const multer = require("multer");


const date=new Date();  
const day=date.getDate();
const month=date.getMonth()+1;
const year=date.getFullYear();

// Define file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      day+"-"+month+"-"+year + "-" + file.originalname
    ); // 23/08/2022
  },
});

// Specify file format that can be saved
function fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
//   const maxSize= 2 * 1024 * 1024;
//   limits:{fileSize:maxSize}
  const upload = multer({ storage, fileFilter, });

  module.exports=upload