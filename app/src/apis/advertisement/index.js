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
  validation(joi.advertisement.params.delete, "params"),
  ctrl.deleteInquiry,
);

router.put(
  "/:inquiryNo",
  validation(joi.advertisement.body.inquiry.update, "body"),
  validation(joi.advertisement.params.put, "params"),
  ctrl.updateInquiry,
);

router.get(
  "/inquiries/:userNo",
  validation(joi.advertisement.params.get, "params"),
  ctrl.findAdvertisementByInquirer,
);

module.exports = router;
