"use strict";
const handler = require("serverless-express/handler");
const app = require("./app");

module.exports.handler = handler(app);
