import logger from "../logger";


export default (error, req, res, next) => {
  res.status(500).json({ message: "Server error" });
  logger.error(error.message);
  next(error);
};
