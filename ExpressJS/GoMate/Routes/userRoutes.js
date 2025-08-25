const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const router = express.Router();
const userController = require("../Controllers/userController");

// const secretKey = "my_secretKey";

// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const userExist = await User.findOne({ username });
//     if (userExist) return res.status(400).json({ message: "user exist" });

//     const hashpassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       username,
//       password: hashpassword,
//     });
//     res.json({ status: 200, message: "user created", user: newUser });
//   } catch (error) {
//     res.json({ message: "user not created", error: error });
//   }
// });

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await userController.register(username, password);

    res.status(200).json({ message: "register success", data: newUser });
  } catch (error) {
    res.status(400).json({ message: "not registerd" });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(401).json({ message: "invalid credentials" });
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: "invalid credentials" });
//     const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });
//     res.json({ message: "Login success", token: token });
//   } catch (error) {
//     res.status(400).json({ message: "invalid username or password" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newData = await userController.login(username, password);

    res.status(200).json({ message: "login success", token: newData });
  } catch (error) {
    res.status(400).json({ message: "invalid username or password" });
  }
});

module.exports = router;
