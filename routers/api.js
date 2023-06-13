const express = require("express");
const { login } = require("../controllers/auth/login");
const { logout, logout_all } = require("../controllers/auth/logout");
const { refreshAccessToken } = require("../controllers/auth/refreshAccessToken");
const { register } = require("../controllers/auth/register");
const { validateRegistrationData } = require("../middlewares/validateRegistrationData");
const { verifyRefreshToken, verifyAccessToken } = require("../middlewares/verifyTokens");
const { uploadImg } = require("../middlewares/uploadImg");
// const { makePredictions } = require("../controllers/predict/predict");
const { getImgAll, getImgByGender, getImgByShape } = require("../controllers/bucket/getImg");

let router = express.Router();

//make ur api router here
router.get("/", (req, res) => {
  res.send("I am API");
});

// example
// router.get('/url', yourController.yourControllerMethod );
// router.get('/url:id', yourController.yourControllerMethod );
// router.get('/login', login.WithEmail)
router.post("/auth/login", login)
router.post("/auth/register", validateRegistrationData, register)
router.get("/auth/refresh", verifyRefreshToken, refreshAccessToken)
router.delete("/auth/logout", logout)
router.delete("/auth/logout_all", logout_all)

// router.post("/predict",uploadImg, makePredictions)

// router.get("/get_img/all",getImgAll)
router.get("/get_img/by_gender",verifyAccessToken,getImgByGender)
router.get("/get_img/by_face_shape",verifyAccessToken,getImgByShape)

exports.api = router;
