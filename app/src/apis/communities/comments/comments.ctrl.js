const logger = require("../../../config/logger");
const CommentService = require("../../../services/Community/CommentService");

const comment = {
  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createComment();

      logger.info(`POST /api/comment/${req.body.communityNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateCommentLikeCnt();

      logger.info(`POST /api/comment/${req.params.commentNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateComment: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateComment();

      logger.info(`PATCH /api/comment 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.deleteComment();

      logger.info(`DELETE /api/comment/${req.params.commentNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = comment;
