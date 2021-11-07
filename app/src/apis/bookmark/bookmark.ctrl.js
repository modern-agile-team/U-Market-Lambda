const logger = require("../../config/logger");
const BookmarkService = require("../../services/Bookmark/BookmarkService");

const process = {
  findAllByUserNo: async (req, res, next) => {
    try {
      const bookmarkService = new BookmarkService(req);
      const response = await bookmarkService.findAllByUserNo();

      logger.info(`GET /api/buylist/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
