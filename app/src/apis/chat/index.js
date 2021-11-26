const express = require("serverless-express/express");
const ctrl = require("./chat.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post("/", validation(joi.chat.body, "body"), ctrl.insertChatRoom);

router.get(
  "/:userNo",
  validation(joi.chat.params, "params"),
  ctrl.findAllByUserNo,
);

module.exports = router;
