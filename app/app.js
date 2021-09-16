const express = require("serverless-express/express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hi", (req, res) => {
  return res.status(200).json({ message: "world" });
});

const user = require("./src/apis/user");

app.use("/api/", user);

module.exports = app;
