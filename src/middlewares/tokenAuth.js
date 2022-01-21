import jwt from "jsonwebtoken";
import User from "../models/user";
import { JWT_KEY } from "../config";

/*jwt auth function
* But I am use passport auth function in middleware
*/

export async function tokenAuth(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json("Authorization Failed.No token Provided");

  try {
    const decoded = jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const payload = jwt.verify(token, JWT_KEY, {
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


//Check auth user
export const authUser = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
      console.log("decode", decoded);
    let auth_user = await User.findOne({ _id: decoded.id }).then((data) => {
      return data;
    });
    return auth_user;
  } catch (error) {
    throw error;
  }
};
