const express = require("express");
const ctrl = require("./major.ctrl");

const router = express.Router();

router.get("/school", ctrl.findSchoolNumAndName);
router.get("/department", ctrl.findDepartmentNumAndName);
router.post("/major", ctrl.createMajorByname);

module.exports = router;
