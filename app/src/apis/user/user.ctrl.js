const logger = require("../../config/logger");
const UserService = require("../../services/User/UserService");

const process = {
  signup: async (req, res, next) => {
    try {
      const user = new UserService(req);
      const response = await user.signup();

      logger.info(`POST /api/user/signup 201 ${response.msg}`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const user = new UserService(req);
      const response = await user.login();

      logger.info(`POST /api/user/login 201 ${response.msg}`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  profile: async (req, res, next) => {
    try {
      const user = new UserService(req);
      const response = await user.profile();

      logger.info(`GET /api/user/profile 200 조회 성공`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
