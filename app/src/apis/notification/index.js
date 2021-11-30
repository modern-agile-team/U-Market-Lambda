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

router.patch(
  "/:userNo",
  validation(joi.notification.params, "params"),
  validation(joi.notification.body, "body"),
  ctrl.update,
);

router.get(
  "/:userNo",
  validation(joi.notification.params, "params"),
  ctrl.findTokenByUserNo,
);
router.delete("/", validation(joi.notification.body, "body"), ctrl.delete);

module.exports = router;
