const bcrypt = require("bcrypt");
const hashString = async (str) => {
  const salt = await bcrypt.genSalt();
  const hashedStr = await bcrypt.hash(str, salt);
  return hashedStr;
};

module.exports = { hashString };
