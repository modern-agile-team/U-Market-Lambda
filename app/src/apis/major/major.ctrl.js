const logger = require("../../config/logger");
const MajorService = require("../../services/Major/MajorService");

const process = {
  findSchoolNumAndName: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.findSchoolNumAndName();

      logger.info(`GET /api/choose/school 200 ${response.msg}`);
      return res.status(200).json(response.result);
    } catch (err) {
      next(err);
    }
  },

  findDepartmentNumAndName: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.findDepartmentNumAndName();

      logger.info(`GET /api/choose/department 200 ${response.msg}`);
      return res.status(200).json(response.result);
    } catch (err) {
      next(err);
    }
  },

  createMajorByname: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.createMajorByname();

      logger.info(`POST /api/choose/major 201 ${response.msg}`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
