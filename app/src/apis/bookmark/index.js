const express = require("serverless-express/express");
const ctrl = require("./bookmark.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo",
  validation(joi.bookmark.params, "params"),
  ctrl.findAllByUserNo,
);

router.post(
  "/:userNo",
  validation(joi.bookmark.params, "params"),
  validation(joi.bookmark.body, "body"),
  ctrl.create,
);

router.delete(
  "/:userNo",
  validation(joi.bookmark.params, "params"),
  validation(joi.bookmark.body, "body"),
  ctrl.delete,
);

module.exports = router;
