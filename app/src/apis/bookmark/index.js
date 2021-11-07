const express = require("serverless-express/express");
const ctrl = require("./bookmark.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo",
  validation(joi.buylist.GET_schema, "params"),
  ctrl.findAllByUserNo,
);

module.exports = router;
