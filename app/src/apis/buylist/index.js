const express = require("serverless-express/express");
const ctrl = require("./buylist.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get("/:userNo", validation(joi.buylist.params, "params"), ctrl.buylist);

module.exports = router;
