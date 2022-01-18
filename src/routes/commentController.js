import { createCommentSchema } from "../validators/comment";
import express from "express";
import CommentController from "../controllers/commentController";

import inputValidator from "../middlewares/inputValidator";

import auth from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create",
  auth,
  inputValidator(createCommentSchema),
  CommentController.addComment
);

export default router;