const logger = require("../../config/logger");

const CommunityService = require("../../services/Community/CommunityService");
const Validator = require("../../utils/Validator");

const communities = {
  home: async (req, res, next) => {
    try {
      req.sql = Validator.makeSqlAboutWhereStatements(req.query);

      const community = new CommunityService(req);
      const response = await community.findAllAboutCategory();

      logger.info(`GET /api/communities 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  detail: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const response = await community.detailView();

      logger.info(`GET /api/communities/:communityNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const response = await community.register();

      logger.info(`POST /api/communitys/:communityNo 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  // updateView: async (req, res, next) => {
  //   try {
  //     const community = new CommunityService(req);
  //     const response = await community.updateView();

  //     logger.info(`PUT /api/communitys/:communityNo 200`);
  //     return res.status(200).json(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  // delete: async (req, res, next) => {
  //   try {
  //     const community = new CommunityService(req);
  //     const isDelete = await community.delete();

  //     if (isDelete) {
  //       logger.info(`DELETE /api/communitys/:communityNo 204`);
  //       return res.status(204).end();
  //     }
  //     throw new Error("Not Exist Community");
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

module.exports = {
  communities,
};
