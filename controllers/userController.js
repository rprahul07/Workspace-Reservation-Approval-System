const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password,role } = req.body;

  if (!name || !email || !password||!role) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  console.log("ok1");

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }
  console.log("ok2");

  const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.create({ name, email, password: hashedPassword, role });
    console.log("User created:", user);
 
  console.log("ok3");
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  console.log("ok4");
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      { username: user.username, email: user.email, id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
});

module.exports = { registerUser, loginUser };