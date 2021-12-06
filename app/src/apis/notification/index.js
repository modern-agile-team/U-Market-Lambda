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

router.post(
  "/token/:userNo",
  validation(joi.notification.params, "params"),
  validation(joi.notification.tokenBody, "body"),
  ctrl.createToken,
);

router.patch(
  "/token/:userNo",
  validation(joi.notification.params, "params"),
  validation(joi.notification.tokenBody, "body"),
  ctrl.update,
);

router.get(
  "/token/:userNo",
  validation(joi.notification.params, "params"),
  ctrl.findTokenByUserNo,
);

router.get(
  "/:userNo",
  validation(joi.notification.params, "params"),
  ctrl.findAllByUserNo,
);

router.delete("/", validation(joi.notification.body, "body"), ctrl.delete);

module.exports = router;
