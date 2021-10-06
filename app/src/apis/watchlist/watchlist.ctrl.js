const logger = require("../../config/logger");
const WatchlistService = require("../../services/Watchlist/WatchlistService");

const process = {
  findAllByUserNum: async (req, res, next) => {
    try {
      const watchlist = new WatchlistService(req);
      const response = await watchlist.findAllByUserNum();

      logger.info(`GET /api/watchlist/:userNo 200 조회 성공`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const watchlist = new WatchlistService(req);
      const response = await watchlist.create();

      logger.info(`POST /api/watchlist 201 생성 성공`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const watchlist = new WatchlistService(req);
      const response = await watchlist.delete();

      logger.info(`DELETE /api/watchlist 201 삭제 성공`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
