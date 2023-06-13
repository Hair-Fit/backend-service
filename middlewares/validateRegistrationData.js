const { findUserByUsernameOrEmail } = require("../models/User");


const validateRegistrationData = async(req, res, next)=>{
  const { email, name, password, gender }=req.body;
  if (!password) return res.status(400).json({ error: "No password provided" });

  if (!name) return res.status(400).json({ error: "No name provided" });

  if (!email) return res.status(400).json({ error: "No email provided" });

  if (!gender) return res.status(400).json({ error: "No gender provided" });

  let user = await findUserByUsernameOrEmail(email);
  // console.log(user);
  if (user) {
    let error = "Email already exits";
    // if (user.email !== email) error = "Username already exits";
    return res.json({ error });
  }
  req.user = {
    email,
    name,
    password,
    gender
  };
  // console.log(req.user);

  next();
}

module.exports = {validateRegistrationData}