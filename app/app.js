const express = require("serverless-express/express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const logger = require("./src/config/logger");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const cors = require("cors");

const app = express();

dotenv.config();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, PATCH ,DELETE, OPTIONS",
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Content-Types", "application/json");
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.MODE === "dev") {
  app.use(
    morgan("tiny", {
      stream: {
        write: message => logger.info(message),
      },
    }),
  );
}
app.use(errorMiddleware);

const user = require("./src/apis/user");
const home = require("./src/apis/home");
const major = require("./src/apis/major");

app.use("/api/user", user);
app.use("/api/home", home);
app.use("/api/pick", major);

module.exports = app;
