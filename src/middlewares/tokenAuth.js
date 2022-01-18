import jwt from "jsonwebtoken";
import User from "../models/user";

export async function tokenAuth(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json("Authorization Failed.No token Provided");

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey", async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const payload = jwt.verify(token, "jwtPrivateKey", {
            ignoreExpiration: true,
          });
          return res.status(401).json({ error: true, msg: "Expired token." });
        }

        return res.status(401).json({ error: true, msg: "Token Invalid." });
      }
    });

    req.user = await User.findOne(decoded._id);

    next();
  } catch (error) {
    res.status(401).json("Authorization Failed. Invald token");
  }
}

export const authUser = async (token) => {
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    //   console.log("decode", decoded);
    let auth_user = await User.findOne({ _id: decoded._id }).then((data) => {
      return data;
    });
    return auth_user;
  } catch (error) {
    throw error;
  }
};
