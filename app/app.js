const express = require("serverless-express/express");

const app = express();

app.get("/hi", (req, res) => {
  return res.status(200).json({ message: "world" });
});

module.exports = app;
