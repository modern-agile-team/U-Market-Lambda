const express = require("serverless-express/express");
const ctrl = require("./advertisement.ctrl");
// const joi = require("../../utils/schemas");
// const validation = require("../../middleware/validation");
// const { findReplyCountByCommentNo } = require("../../repository/Community/Comment/CommunityReplyRepository");

const router = express.Router();

router.post("/inquiry", ctrl.saveInquiry);

module.exports = router;
