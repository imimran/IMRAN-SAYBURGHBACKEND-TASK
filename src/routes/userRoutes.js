import {
  createUserSchema,
  loginSchema,
} from "../validators/user";
import express from "express";
import UserController from "../controllers/userController";

import inputValidator from "../middlewares/inputValidator";

import auth from "../middlewares/auth";

const router = express.Router();

//user routes
router.post("/token",  UserController.generateToken);
router.get("/all", auth, UserController.getAllUsers);
router.post("/login", inputValidator(loginSchema), UserController.login);
router.post("/logout", UserController.logout);
router.post(
  "/registration",
  inputValidator(createUserSchema),
  UserController.addUser
);

export default router;
