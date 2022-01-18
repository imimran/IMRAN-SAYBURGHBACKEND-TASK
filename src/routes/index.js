import express from "express";
import UserRouter from "./userRoutes";
import PostRoutes from "./postRoutes";


const router = express.Router();

router.use("/user", UserRouter);
router.use("/post", PostRoutes);


router.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

export { router };
