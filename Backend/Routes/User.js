const express = require('express')
const User = require('../model/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()


router.get("/", function (req, res) {
  res.send("I am from route one");
});


router.post("/register", async (req, res) => {
   console.log("REGISTER ROUTE HIT");
  const { name, email, password } = req.body;
  if ((!name || !email || !password)) {
    return res.status(400).json({ message: "Every field is required" });
  }
  try {
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(409).json("User already registered");
    }
    const user = new User({ name, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: "Signed up successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email });
    if (!check) {
      return res.status(400).json("You are not registered yet!");
    }
    const ispassmatch = await bcrypt.compare(password, check.password);
    if (!ispassmatch) {
      return res.status(404).json({ message: "Password does not match" });
    }
    const jwttoken = jwt.sign({id:check._id, email: check.email }, "12345", {
      expiresIn: "24h",
    });
    res.cookie("token", jwttoken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Login Successfuly!", email });
  } catch (error) {
    console.log("login error: ", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/logout',async(req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    sameSite:'lax',
    secure:"production"
  })
  return res.status(200).json({message:"Logout successfull"})
})

module.exports = router
