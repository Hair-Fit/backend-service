const { findUserByUsernameOrEmail } = require("../../models/User");
const { randomUUID } = require("crypto");
const { genRefreshToken, genAccessToken } = require("../../utils/genToken");
const bcrypt = require("bcrypt");
const { addRefreshToken } = require("../../models/RefreshToken");


const login = async (req, res) => {
  try {
    if (!req.body.email) return res.status(400).json({ error: "No Email provided" });
    if (!req.body.password) return res.status(400).json({ error: "No Password provided" });

    const { email, password } = req.body;

    // User can log in with username or email
    const user = await findUserByUsernameOrEmail(email);

    if (!user) return res.status(404).json({ error: "User Not Found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: "Wrong Password" });
    const accessToken = genAccessToken(user);
    const tokenId = randomUUID();
    const refreshToken = genRefreshToken(user, tokenId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 30 * 1000, // 30 days
      overwrite: true
    });

    // add the token to the database
    addRefreshToken(tokenId, user.id, refreshToken);

    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Error" });
  }
};
module.exports = { login };
