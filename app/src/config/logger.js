const winston = require("winston");

const setting = winston.format;

const printFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} : ${message}`;
});

const printLogFormat = {
  file: setting.combine(
    setting.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printFormat,
  ),

  console: setting.combine(setting.colorize(), setting.simple()),
};

const opts = {
  console: new winston.transports.Console({
    level: "info",
    levels: winston.config.npm.levels,
    format: printLogFormat.console,
  }),
};

const logger = winston.createLogger({
  transports: [opts.console],
});

// if (process.env.NODE_ENV !== "prodction") {
//   logger.add(opts.console);
// }

module.exports = logger;
