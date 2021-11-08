const logger = require("../../../config/logger");
const CommentService = require("../../../services/Community/CommentService");

const reply = {
  findReplyByCommentNo: async (req, res, next) => {
    try {
      const replies = new CommentService(req);
      const response = await replies.findReplyByCommentNo();

      logger.info(
        `GET /api/replies/${req.params.commentNo}/${req.params.userNo}  200`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createReply();

      logger.info(`POST /api/replies  201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateContent: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.updateReply();

      logger.info(`PATCH /api/replies/${req.params.replyNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const replyComment = new CommentService(req);
      const response = await replyComment.updateReplyLikeCnt();

      logger.info(`POST /api/replies/${req.params.replyNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const replyComment = new CommentService(req);
      const response = await replyComment.deleteReply();

      logger.info(`DELETE /api/replies/${req.params.replyNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = reply;
