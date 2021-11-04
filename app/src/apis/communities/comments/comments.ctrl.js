const logger = require("../../../config/logger");
const CommentService = require("../../../services/Community/CommentService");

const comment = {
  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createComment();

      logger.info(`POST /api/comment/${req.params.communityNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateCommentLikeCnt();

      logger.info(`PATCH /api/comment/${req.params.commentNo} 201`);
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
      return response ? res.status(201).json(response) : res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

const replyComment = {
  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createReplyComment();

      logger.info(
        `POST /api/comment/reply/${req.params.communityNo}/${req.params.commentNo}  201`,
      );
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateContent: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateReplyComment();

      logger.info(`PATCH /api/comment/reply 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const replyComment = new CommentService(req);
      const response = await replyComment.updateReplyCommentLikeCnt();

      logger.info(`PATCH /api/comment/reply/${req.params.replyCommentNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const replyComment = new CommentService(req);
      await replyComment.deleteReplyComment();

      logger.info(`DELETE /api/comment/reply/${req.params.replyCommentNo} 201`);
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = { comment, replyComment };
