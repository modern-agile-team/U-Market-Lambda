const express = require("express");
const ctrl = require("./inquiry.ctrl");
const joi = require("../../utils/schemas");
const joiValidator = require("../../middleware/validation");

const router = express.Router();

router.post("/", joiValidator(joi.inquiry.body, "body"), ctrl.createInquiry);

module.exports = router;
