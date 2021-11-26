const logger = require("../../config/logger");
const BookmarkService = require("../../services/Bookmark/BookmarkService");

const process = {
  findAllByUserNo: async (req, res, next) => {
    try {
      const bookmarkService = new BookmarkService(req);
      const response = await bookmarkService.findAllByUserNo();

      logger.info(`GET /api/bookmarks/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const bookmarkService = new BookmarkService(req);
      const response = await bookmarkService.create();

      logger.info(`POST /api/bookmarks/:userNo 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const bookmarkService = new BookmarkService(req);
      const response = await bookmarkService.delete();

      logger.info(`DELETE /api/bookmarks/:userNo 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
