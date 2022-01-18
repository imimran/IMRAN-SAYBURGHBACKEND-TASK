import logger from "../logger";

export default (bodySchema, paramsSchema) => {
  return async (req, res, next) => {
    try {
      if (bodySchema) {
        await bodySchema.validate(req.body, { abortEarly: false });
      }
      if (paramsSchema) {
        await paramsSchema.validate(req.params, { abortEarly: false });
      }
      next();
    } catch (error) {
      const err = {};
      error.inner.forEach((e) => {
        err[e.path] = e.message;
      });
      logger.error(err);
      res.status(400).json(err);
    }
  };
};
