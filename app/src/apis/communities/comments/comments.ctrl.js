const logger = require("../../../config/logger");
const CommentService = require("../../../services/Community/CommentService");

const comments = {
  create: async (req, res, next) => {
    try {
      const comment = new CommentService(req);
      const response = await comment.createComment();

      logger.info(`POST /api/communities/{communityNo}/comment 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = comments;
