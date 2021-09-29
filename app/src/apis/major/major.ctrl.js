const logger = require("../../config/logger");
const Major = require("../../models/services/Major/Major");

const process = {
  findSchoolNumAndName: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.findSchoolNumAndName();
      if (response.success) {
        logger.info(`GET /api/choose/school 200 ${response.msg}`);
        return res.status(200).json(response.result);
      }
      logger.error(`GET /api/choose/school 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      logger.error(`GET /api/choose/school 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },

  findDepartmentNumAndName: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.findDepartmentNumAndName();
      if (response.success) {
        logger.info(`GET /api/choose/department 200 ${response.msg}`);
        return res.status(200).json(response.result);
      }
      logger.error(`GET /api/choose/department 400 ${response.msg}`);
      return res.status(400).json(response);
    } catch (err) {
      logger.error(`GET /api/choose/department 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },

  createMajorByname: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.createMajorByname();
      if (response.success) {
        logger.info(`POST /api/choose/major 201 ${response.msg}`);
        return res.status(201).json(response);
      }
      logger.error(`POST /api/choose/major 401 ${response.msg}`);
      return res.status(401).json(response);
    } catch (err) {
      logger.error(`POST /api/choose/major 500 err:${err}`);
      return res.status(500).json(err);
    }
  },
};

module.exports = process;
