const express = require("serverless-express/express");
const ctrl = require("./review.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo",
  validation(joi.user.review.find.params, "params"),
  validation(joi.user.review.find.query, "query"),
  ctrl.findBuyerByUserNo,
);

router.post(
  "/",
  validation(joi.user.review.create.body, "body"),
  ctrl.createReview,
);

router.patch(
  "/:userNo",
  validation(joi.user.review.updateScore.params, "params"),
  validation(joi.user.review.updateScore.body, "body"),
  ctrl.updateTrustScore,
);

module.exports = router;
