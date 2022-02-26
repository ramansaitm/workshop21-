const User = require("../models/UserModels");
const aysncHandler = require("express-async-handler");
const generationToken=require('../config/utlies/generationToken')
const registerUser = aysncHandler(async (req, res) => {
  const { name,phone ,email, password, pic } = req.body;
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("user Already Exits");
  }

  const user = await User.create({ name,phone,email, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone:user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generationToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});
const authUser = aysncHandler(async (req, res) => {
  const { email, password} = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({  
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
        pic: user.pic,
       token: generationToken(user._id),})
  } else {
    res.status(400);
    throw new Error("invaild email or password");
  }
   
});


module.exports = { registerUser ,authUser};
