import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import path from "path";
import errorHandler from "./middlewares/errorHandler";
import { createConnectionAndInitialize } from "./models/db";
import logger from "./logger";
import { MONGO_URL } from "./config";
import { router } from "./routes";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());

//db
createConnectionAndInitialize(MONGO_URL)
  .then()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

process.on("unhandledRejection", (error) => {
  throw error;
});

// app.use(cors());


app.get("/", (req, res) => {
  res.status(200).json({ error: false, msg: "Hello Imran" });
});


//main route import
app.use("/api/v1", router);

app.use(errorHandler);
export default app;
