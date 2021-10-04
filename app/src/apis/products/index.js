const express = require("serverless-express/express");
const ctrl = require("./products.ctrl");

const router = express.Router();

router.get("/", ctrl.products.home);

module.exports = router;
