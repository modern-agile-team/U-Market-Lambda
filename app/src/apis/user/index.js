const express = require("serverless-express/express");
const ctrl = require("./user.ctrl");
const joi = require("../../utils/schemas");
const joiValidator = require("../../middleware/validation");

const router = express.Router();

router.post(
  "/signup",
  joiValidator(joi.signup_POST_schema, "body"),
  ctrl.signup,
);
router.post("/login", joiValidator(joi.login_POST_schema, "body"), ctrl.login);

module.exports = router;
