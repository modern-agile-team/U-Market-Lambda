const express = require("serverless-express/express");
const joi = require("../../../utils/schemas");
const validation = require("../../../middleware/validation");
const commentCtrl = require("./comments.ctrl");

const router = express.Router();

router.post(
  "/:communityNo",
  validation(joi.comments.POST_schema.params, "params"),
  validation(joi.comments.POST_schema.body, "body"),
  commentCtrl.create,
);

router.put(
  "/count/:commentNo",
  validation(joi.comments.updateLikeCnt.params, "params"),
  validation(joi.comments.updateLikeCnt.body, "body"),
  commentCtrl.updateLikeCnt,
);

router.put(
  "/count/reply/:replyCommentNo",
  validation(joi.comments.updateReplyLikeCnt.params, "params"),
  validation(joi.comments.updateReplyLikeCnt.body, "body"),
  commentCtrl.updateReplyLikeCnt,
);

router.put(
  "/",
  validation(joi.comments.updateComment, "body"),
  commentCtrl.updateComment,
);

router.put(
  "/reply",
  validation(joi.comments.updateReplyComment, "body"),
  commentCtrl.updateReplyComment,
);

module.exports = router;
