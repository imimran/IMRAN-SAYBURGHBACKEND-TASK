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
router.delete("/:postId", auth, PostController.deletePost);
router.put("/:postId", auth, PostController.updatePost);

export default router;
