const { findUserByUsernameOrEmail } = require("../models/User");


const validateRegistrationData = async(req, res, next)=>{
  const { email, username, password }=req.body;
  if (!password) return res.status(400).json({ error: "No password provided" });

  if (!username) return res.status(400).json({ error: "No username provided" });

  if (!email) return res.status(400).json({ error: "No email provided" });

  let user = await findUserByUsernameOrEmail(username,email);
  console.log(user);
  if (user) {
    let error = "Email already exits";
    if (user.email !== email) error = "Username already exits";
    return res.json({ error });
  }
  req.user = {
    email,
    username,
    password,
  };
  // console.log(req.user);

  next();
}

module.exports = {validateRegistrationData}