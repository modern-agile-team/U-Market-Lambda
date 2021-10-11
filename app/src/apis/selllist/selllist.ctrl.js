const logger = require("../../config/logger");

const SelllistService = require("../../services/Selllist/SelllistService");

const process = {
  selllist: async (req, res, next) => {
    try {
      const selllistService = new SelllistService(req);
      const response = await selllistService.findAllByUserNo();

      logger.info(`GET /api/selllist/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  endSelllist: async (req, res, next) => {
    try {
      const selllistService = new SelllistService(req);
      const response = await selllistService.findEndingTradeByUserNo();

      logger.info(`GET /api/selllist/finish/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
