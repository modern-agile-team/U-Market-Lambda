const express = require("serverless-express/express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const logger = require("./src/config/logger");

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

const user = require("./src/apis/user");
const home = require("./src/apis/home");
const products = require("./src/apis/products");
const communities = require("./src/apis/communities");
const major = require("./src/apis/major");

app.use("/api/user", user);
app.use("/api/home", home);
app.use("/api/products", products);
app.use("/api/communities", communities);
app.use("/api/choose", major);

module.exports = app;
