const express = require("serverless-express/express");
const ctrl = require("./user.ctrl");
const joi = require("../../utils/schemas");
const joiValidator = require("../../middleware/validation");

const router = express.Router();

router.get("/:userNo", joiValidator(joi.user.params, "params"), ctrl.profile);
router.post(
  "/signup",
  joiValidator(joi.signup_POST_schema, "body"),
  ctrl.signup,
);
router.post(
  "/signup/email",
  joiValidator(joi.signup_POST_schema, "body"),
  ctrl.sendEmailToAdmin,
);

router.post("/login", joiValidator(joi.login_POST_schema, "body"), ctrl.login);
router.post(
  "/findpassword",
  joiValidator(joi.findPassword.POST_schema, "body"),
  ctrl.sendNewPsword,
);
router.post(
  "/changepassword",
  joiValidator(joi.changePassword.POST_schema, "body"),
  ctrl.changePassword,
);

router.put(
  "/:userNo",
  joiValidator(joi.user.params, "params"),
  joiValidator(joi.user.body, "body"),
  ctrl.update,
);

module.exports = router;
