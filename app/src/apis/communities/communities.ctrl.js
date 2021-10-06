const logger = require("../../config/logger");

const CommunityService = require("../../services/Community/CommunityService");
const Validator = require("../../utils/Validator");

const communities = {
  home: async (req, res) => {
    try {
      req.sql = Validator.makeSqlAboutWhereStatements(req.query);

      const community = new CommunityService(req);
      const response = await community.findAllAboutCategory();

      logger.info(`GET /api/communities 200`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/communities 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
  detail: async (req, res) => {
    try {
      const community = new CommunityService(req);
      const response = await community.detailView();

      logger.info(`GET /api/communities/:communityNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/communities/:communityNo 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
};

module.exports = {
  communities,
};
