import mongoose from "mongoose";
import logger from "../logger";


//db connect
export async function createConnectionAndInitialize(dbUrl) {
  try {
    await mongoose.connect(dbUrl);

    logger.info("DB connected");
  } catch (error) {
    logger.error("DB not connected", error);
  }
}