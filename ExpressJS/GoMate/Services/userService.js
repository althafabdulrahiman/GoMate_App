const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "my_secretKey";

const register = async (username, password) => {
  const userExist = await User.findOne({ username });
  if (userExist) throw new Error("user already exist");

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashpassword,
  });

  return newUser;
};

const login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) throw new Error("user not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("incorrect password");

  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });

  return token;
};

module.exports = { register, login };
