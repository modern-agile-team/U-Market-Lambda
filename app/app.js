const express = require("serverless-express/express");
const dotenv = require("dotenv");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

const user = require("./src/apis/user");
const home = require("./src/apis/home");
const products = require("./src/apis/products");
const major = require("./src/apis/major");

app.use("/api/user", user);
app.use("/api/home", home);
app.use("/api/pick", major);
app.use("/api/products", products);

module.exports = app;
