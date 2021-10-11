const logger = require("../../config/logger");

const BuylistService = require("../../services/Buylist/BuylistService");

const process = {
  buylist: async (req, res, next) => {
    try {
      const buylistService = new BuylistService(req);
      const response = await buylistService.findAllByUserNoAndProductNo();

      logger.info(`GET /api/buylist/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
