const { randomUUID } = require("crypto");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken")

config()

const genToken = (user, secret, expiresIn, tokenId)=>{
  const { id, username, email } = user
    const jwtid = tokenId || randomUUID()
    const token = jwt.sign({ jwtid, id, username, email }, secret, {
        algorithm: "HS256",
        expiresIn,
    })

    return token
}
const genAccessToken = (user) => {
  return genToken(user, process.env.ACCESS_TOKEN_SECRET, "5m")
}

const genRefreshToken = (user, tokenId) => {
  return genToken(user, process.env.REFRESH_TOKEN_SECRET, "30d", tokenId)
}

module.exports = {genAccessToken,genRefreshToken}