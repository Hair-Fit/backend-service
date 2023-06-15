const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const { tokenExistInDb } = require("../models/RefreshToken");
const tokenVerifier = {};

config();

const verifyToken = (token, secret) => {
  let user = {};
  jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, decoded) => {
    if (err) user.tokenError = err.name;
    else user = decoded;
  });
  // console.log(user);
  return user;
};

tokenVerifier.validateAccessToken = (accessToken) => {
  return verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
};

tokenVerifier.verifyRefreshToken = async (refreshToken) => {
  return verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

tokenVerifier.validateRefreshToken = async (refreshToken) => {
  const user = await tokenVerifier.verifyRefreshToken(refreshToken);

  if (user.tokenError) return user;

  const tokenExists = await tokenExistInDb(user.jwtid, refreshToken);

  if (!tokenExists) user.tokenError = "OldToken";
  return user;
};

module.exports = { tokenVerifier };
