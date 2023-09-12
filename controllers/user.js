//Controllers, handling routes for signin and login pages

const User = require("../models/user");
const { v4: uuidv4 } = require("uuid"); //package to generate unique id, using as sessionid
const { setUser } = require("../auth");


//Create User
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

//Find user, and show 
async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", { error: "Invalid Username or password" });

  const token = setUser(user); //generate token
  res.cookie("token", token); //return cookie

  return res.redirect("/"); //if logged in successfully, redirect to homepage
}

module.exports = {
  handleUserSignUp,
  handleLogin,
};
