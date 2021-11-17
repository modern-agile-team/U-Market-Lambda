const express = require("express");
const ctrl = require("./major.ctrl");
const joi = require("../../utils/schemas");
const joiValidator = require("../../middleware/validation");

const router = express.Router();

router.get("/regions/:regionNo/schools", ctrl.findSchoolNumAndName);
router.get("/departments", ctrl.findDepartmentNumAndName);
router.get("/departments/:departmentNo/majors", ctrl.findMajorNumAndName);
router.post("/major", joiValidator(joi.major, "body"), ctrl.createMajorByname);

module.exports = router;
