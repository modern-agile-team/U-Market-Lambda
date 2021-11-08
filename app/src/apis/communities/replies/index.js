const express = require("serverless-express/express");
const joi = require("../../../utils/schemas");
const validation = require("../../../middleware/validation");
const ctrl = require("./reply.ctrl");

const router = express.Router();

router.get(
  "/comment/:commentNo/:userNo",
  validation(joi.reply.find.params, "params"),
  ctrl.findReplyByCommentNo,
);

router.post("/", validation(joi.reply.create.body, "body"), ctrl.create);

router.post(
  "/:replyNo",
  validation(joi.reply.updateLikeCnt.params, "params"),
  validation(joi.reply.updateLikeCnt.body, "body"),
  ctrl.updateLikeCnt,
);

router.put(
  "/:replyNo",
  validation(joi.reply.updateContent.body, "body"),
  validation(joi.reply.updateContent.params, "params"),
  ctrl.updateContent,
);

router.delete(
  "/:replyNo",
  validation(joi.reply.delete.params, "params"),
  validation(joi.reply.delete.body, "body"),
  ctrl.delete,
);

module.exports = router;
