const express = require("serverless-express/express");
const ctrl = require("./notification.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post(
  "/:userNo",
  validation(joi.notification.params, "params"),
  validation(joi.notification.body, "body"),
  ctrl.create,
);
router.get(
  "/:userNo",
  validation(joi.notification.params, "params"),
  ctrl.findTokenByUserNo,
);

module.exports = router;
