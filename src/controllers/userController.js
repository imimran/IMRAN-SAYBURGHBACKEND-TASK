
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../logger";

const getAllUsers = async (_req, res) => {
  const user = await User.find({});
  return res.status(200).json(user);
};

const addUser = async (req, res) => {
  const data = req.body;

  const foundEmail = await User.findOne({
    email: data.email,
  });

  if (foundEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }


  const salt = await bcrypt.genSalt(10);
  let  passwordHash = await bcrypt.hash(data.password, salt);

  const newUser = new User({
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: passwordHash,
    occupation: data.occupation,
  });

  const user = await newUser.save();


  return res.status(201).json({ msg: "User create successfully"});
};


const login = async (req, res) => {

  const { email, password } = req.body;

  //checking email registerd or not...
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

  //checking for password match..
  const isMatched = await bcrypt.compare(password, foundUser.password);
  if (!isMatched) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

 
  const payload = {
    id: foundUser._id,
    email: foundUser.email,
  };

  const refreshToken = jwt.sign(payload, "jwtPrivateKey", { expiresIn: "24h" });

  const token =jwt.sign(payload, "jwtPrivateKey", { expiresIn: "1h" })

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        accessToken: token,
        refreshToken: refreshToken,
      });
 
};

const logout = async (_req, res) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "Successfully logged out" });
};

export default {
  getAllUsers,
  addUser,
  login,
  logout,
};
