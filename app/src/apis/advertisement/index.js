const express = require("serverless-express/express");
const ctrl = require("./advertisement.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post(
  "/inquiry",
  validation(joi.advertisement.body.inquiry, "body"),
  ctrl.saveInquiry,
);

module.exports = router;
