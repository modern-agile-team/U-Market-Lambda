const express = require("serverless-express/express");
const ctrl = require("./review.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo/writer",
  validation(joi.user.review.find.params, "params"),
  ctrl.findAllByWriter,
);

router.get(
  "/:userNo/receiver",
  validation(joi.user.review.find.params, "params"),
  ctrl.findAllByReceiver,
);

router.get(
  "/:userNo/seller",
  validation(joi.user.review.find.params, "params"),
  ctrl.findNotReviewBySeller,
);

router.get(
  "/:userNo/buyer",
  validation(joi.user.review.find.params, "params"),
  ctrl.findNotReviewByBuyer,
);

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

router.post(
  "/:userNo",
  validation(joi.user.review.createBuyer.body, "body"),
  validation(joi.user.review.createBuyer.params, "params"),
  ctrl.createBuyer,
);

router.patch(
  "/:userNo",
  validation(joi.user.review.updateScore.params, "params"),
  validation(joi.user.review.updateScore.body, "body"),
  ctrl.updateTrustScore,
);

module.exports = router;
