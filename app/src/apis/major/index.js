const express = require("express");
const ctrl = require("./major.ctrl");
const joi = require("../../utils/schemas");
const joiValidator = require("../middleware/validation");

const router = express.Router();

router.get("/school", ctrl.findSchoolNumAndName);
router.get("/department", ctrl.findDepartmentNumAndName);
router.post(
  "/major",
  joiValidator(joi.major_POST_schema, "body"),
  ctrl.createMajorByname,
);

module.exports = router;
