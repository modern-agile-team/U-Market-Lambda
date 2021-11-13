const express = require("serverless-express/express");
const ctrl = require("./advertisement.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post(
  "/inquiry",
  validation(joi.advertisement.body.inquiry.save, "body"),
  ctrl.saveInquiry,
);

router.delete(
  "/:inquiryNo",
  validation(joi.advertisement.params, "params"),
  ctrl.deleteInquiry,
);

module.exports = router;
