const multer = require("multer");
// const { localStorage } = require("../config/localStorage");
const { theLocalStorage } = require("../config/theLocalStorage");

const imageFileFilter = (req, file, callback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = file.originalname.match(filetypes);
  // Check mime
  req['filename']=file.originalname
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback("Error: Images Only!");
  }
};

const upload = multer({storage:theLocalStorage , fileFilter: imageFileFilter });
let uploadSingle = upload.single("file");
// console.log(uploadSingle);

module.exports = { uploadSingle };
