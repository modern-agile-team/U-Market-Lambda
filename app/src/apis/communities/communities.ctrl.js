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

      logger.info(`POST /api/community 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateView: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const response = await community.updateView();

      logger.info(`PUT /api/communities/:communityNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateLikeCnt: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const response = await community.updateLikeCnt();

      logger.info(`POST /api/communities/:communityNo 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateHit: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const response = await community.updateHit();

      logger.info(`PATCH /api/communities/:communityNo/hit 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const community = new CommunityService(req);
      const isDelete = await community.delete();

      logger.info(`DELETE /api/communities/:communityNo 201`);
      return res.status(201).json(isDelete);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  communities,
};
