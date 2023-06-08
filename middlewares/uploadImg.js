const { uploadSingle } = require("../utils/imgUpAndFilter");

const uploadImg = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).send({ success: false, message: "Only Images are allowed!" });
    const file = req.file;
    // console.log(file);
    if (!file) {
      return res.status(400).send({ success: false, message: "Please Upload A File!" });
    }
    next();
  });
};

module.exports = { uploadImg };
