const logger = require("../../../config/logger");
const CommentService = require("../../../services/Community/CommentService");

const comments = {
  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createComment();

      logger.info(`POST /api/comments/${req.params.communityNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateCommentLikeCnt();

      logger.info(`PUT /api/comments/${req.params.commentNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateReplyLikeCnt: async (req, res, next) => {
    try {
      const replyComment = new CommentService(req);
      const response = await replyComment.updateReplyCommentLikeCnt();

      logger.info(`PUT /api/comments/reply/${req.params.replyCommentNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateComment: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateComment();

      logger.info(`PUT /api/comments 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = comments;
