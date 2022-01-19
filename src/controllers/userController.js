import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let refreshTokens = [];

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
  let passwordHash = await bcrypt.hash(data.password, salt);

  const newUser = new User({
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: passwordHash,
    occupation: data.occupation,
  });

  const user = await newUser.save();

  return res.status(201).json({ msg: "User create successfully" });
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

  const refreshToken = jwt.sign(payload, "jwtPrivateKey", { expiresIn: "1d" });
  
  const token = jwt.sign(payload, "jwtPrivateKey", { expiresIn: "10s" });

  const response = {
    msg: "Logged in Success",
    token: token,
    refreshToken: refreshToken,
  };
  refreshTokens.push(refreshToken);

  return res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
    })
    .status(200)
    .json(response);
};


const generateToken = (req,res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.json({ message: "Refresh token not found, login again" });
  }

  // If the refresh token is valid, create a new accessToken and return it.
  jwt.verify(refreshToken, "jwtPrivateKey", (err, user) => {
      if (!err) {
          const accessToken = jwt.sign({  id: user.id, email: user.email }, "jwtPrivateKey", {
              expiresIn: "20s"
          });

          console.log("accessToken", accessToken);
          return res
          .cookie("accessToken", accessToken, {
                  httpOnly: true,
                })
          .json({ success: true, accessToken });
      } else {
          return res.json({
              success: false,
              message: "Invalid refresh token"
          });
      }
  });
}

const logout = async (_req, res) => {
  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Successfully logged out" });
};

export default {
  getAllUsers,
  addUser,
  login,
  logout,
  generateToken
};
