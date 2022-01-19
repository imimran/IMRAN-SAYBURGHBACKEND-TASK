import express from "express";
import UserRouter from "./userRoutes";
import PostRoutes from "./postRoutes";
import commentController from "./commentController";


const router = express.Router();

//import all routes
router.use("/user", UserRouter);
router.use("/post", PostRoutes);
router.use("/comment", commentController);


router.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

export { router };
