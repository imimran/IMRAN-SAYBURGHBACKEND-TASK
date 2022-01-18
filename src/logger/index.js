import { createLogger, format, transports } from "winston";

const { prettyPrint } = format;

const logger = createLogger({
  level: "debug",
  format: format.combine(format.json(), prettyPrint()),
  transports: [new transports.Console()],
});

export default logger;
