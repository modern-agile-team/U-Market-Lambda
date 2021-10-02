const express = require("serverless-express/express");
const ctrl = require("./home.ctrl");

const router = express.Router();

router.get("/today", ctrl.home.today);

module.exports = router;
