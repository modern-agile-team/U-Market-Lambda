const express = require("express");
const ctrl = require("./major.ctrl");

const router = express.Router();

router.post("/school", ctrl.createSchoolByname);
router.post("/major", ctrl.createMajorByname);

module.exports = router;
