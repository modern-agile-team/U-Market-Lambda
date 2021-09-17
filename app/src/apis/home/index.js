const express = require("serverless-express/express");
const ctrl = require("./home.ctrl");

const router = express.Router();

router.get("/", ctrl.home);

module.exports = router;
