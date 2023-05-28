const { createUser } = require("../../models/User");

const register = async (req, res)=>{
  console.log(req.user);

  const user = await createUser(req.user)
  if (!user) return res.json({ error: "Registration Failed" });

  const data = {
    username: user.username,
    email: user.email,
  };

  res.json({ data });
}

module.exports = {register}