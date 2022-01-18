import { createPostSchema } from "../validators/post";
import express from "express";
import PostController from "../controllers/postController";

import inputValidator from "../middlewares/inputValidator";

import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create",
  auth,
  inputValidator(createPostSchema),
  PostController.addPost
);

export default router;
