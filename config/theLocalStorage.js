const multer = require('multer');

const theLocalStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './tmp/img');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

module.exports = {theLocalStorage}