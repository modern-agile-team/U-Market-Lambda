const express = require("serverless-express/express");
const joi = require("../../../utils/schemas");
const validation = require("../../../middleware/validation");
const ctrl = require("./comments.ctrl");

const router = express.Router();

router.post(
  "/:communityNo",
  validation(joi.comment.create.params, "params"),
  validation(joi.comment.create.body, "body"),
  ctrl.comments.create,
);

router.post(
  "/reply/:communityNo/:commentNo",
  validation(joi.replyComment.create.body, "body"),
  validation(joi.replyComment.create.params, "params"),
  ctrl.replyComment.create,
);

router.patch(
  "/count/:commentNo",
  validation(joi.comment.updateLikeCnt.params, "params"),
  validation(joi.comment.updateLikeCnt.body, "body"),
  ctrl.comments.updateLikeCnt,
);

router.patch(
  "/count/reply/:replyCommentNo",
  validation(joi.replyComment.updateLikeCnt.params, "params"),
  validation(joi.replyComment.updateLikeCnt.body, "body"),
  ctrl.replyComment.updateLikeCnt,
);

router.patch(
  "/",
  validation(joi.comment.updateContent, "body"),
  ctrl.comments.updateComment,
);

router.patch(
  "/reply",
  validation(joi.replyComment.updateContent, "body"),
  ctrl.replyComment.updateContent,
);

module.exports = router;
