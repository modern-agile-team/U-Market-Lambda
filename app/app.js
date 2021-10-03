const express = require("serverless-express/express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const logger = require("./src/config/logger");
const errorMiddleware = require("./src/apis/middleware/error.Middleware");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan("tiny", {
    stream: {
      write: message => logger.info(message),
    },
  }),
);
app.use(errorMiddleware);

const user = require("./src/apis/user");
const home = require("./src/apis/home");
const major = require("./src/apis/major");

app.use("/api/user", user);
app.use("/api/home", home);
app.use("/api/choose", major);

module.exports = app;
