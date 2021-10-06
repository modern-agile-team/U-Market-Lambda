const express = require("serverless-express/express");
const ctrl = require("./communities.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/",
  validation(joi.communities.root_GET_schema, "query"),
  ctrl.communities.home,
);
router.get(
  "/:communityNo",
  validation(joi.communities.communityNo_GET_schema, "params"),
  ctrl.communities.detail,
);

module.exports = router;
