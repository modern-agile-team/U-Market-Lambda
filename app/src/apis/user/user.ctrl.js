const logger = require("../../config/logger");
const UserService = require("../../services/User/UserService");

const process = {
  signup: async (req, res) => {
    try {
      const user = new UserService(req);
      const response = await user.signup();
      if (response.success) {
        logger.info(`POST /api/user/signup 201 ${response.msg}`);
        return res.status(201).json(response);
      }
      logger.error(`POST /api/user/signup 401 ${response.msg}`);
      return res.status(401).json(response);
    } catch (err) {
      logger.error(`POST /api/user/signup 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = new UserService(req);
      const response = await user.login();
      if (response.success) {
        logger.info(`POST /api/user/login 201 ${response.msg}`);
        return res.status(201).json(response);
      }
      logger.error(`POST /api/user/login 401 ${response.msg}`);
      return res.status(401).json(response);
    } catch (err) {
      logger.error(`POST /api/user/login 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
};

module.exports = process;
