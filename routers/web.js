const express = require("express");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
let router = express.Router();

//make ur web app router here (like for using view)
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get('/cekcek',verifyAccessToken,(req, res) => {
  res.send("I am verfied");
})
exports.web = router;
