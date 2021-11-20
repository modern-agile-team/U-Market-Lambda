const logger = require("../../config/logger");
const SearchService = require("../../services/Search/SearchService");

const process = {
  findProductBySearch: async (req, res, next) => {
    try {
      const search = new SearchService(req);
      const response = await search.findProductBySearch();

      logger.info(`GET /api/search/products?query=${req.query.query}`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findCommunityBySearch: async (req, res, next) => {
    try {
      const search = new SearchService(req);
      const response = await search.findCommunityBySearch();

      logger.info(`GET /api/search/communities?query=${req.query.query}`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
