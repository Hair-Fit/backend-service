const { randomUUID } = require("crypto");
const { genRefreshToken, genAccessToken } = require("../../utils/genToken");
const { deleteRefreshTokenById, addRefreshToken } = require("../../models/RefreshToken");

const refreshAccessToken = async (req, res) => {
  const user = req.user;
  const newTokenId = randomUUID();
  const newRefreshToken = genRefreshToken(user, newTokenId);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 * 30,
    overwrite: true
  });

  deleteRefreshTokenById(user.jwtid);
  addRefreshToken(newTokenId, user.id, newRefreshToken);

  const accessToken = genAccessToken(user);
  return res.json({ accessToken });
};

module.exports = { refreshAccessToken };
