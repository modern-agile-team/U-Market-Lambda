const express = require("serverless-express/express");
const ctrl = require("./communities.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/",
  validation(joi.communities.query.root, "query"),
  ctrl.communities.home,
);
router.get(
  "/:communityNo",
  validation(joi.communities.params.communityNo, "params"),
  ctrl.communities.detail,
);

router.post(
  "/",
  validation(joi.communities.body.root, "body"),
  ctrl.communities.create,
);

// router.put(
//   "/:productNo",
//   validation(joi.communities.put.params.productNo, "params"),
//   validation(joi.communities.put.body.productNo, "body"),
//   ctrl.communities.updateView,
// );

// router.delete(
//   "/:productNo",
//   validation(joi.communities.put.params.productNo, "params"),
//   ctrl.communities.delete,
// );

module.exports = router;
