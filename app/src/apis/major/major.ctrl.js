const logger = require("../../config/logger");
const MajorService = require("../../services/Major/MajorService");

const process = {
  findSchoolNumAndName: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.findSchoolNumAndName();

      logger.info(
        `GET /api/pick/regions/:regionNo/schools 200 학교 정보가 응답되었습니다.`,
      );
      return res.status(200).json(response.schools);
    } catch (err) {
      next(err);
    }
  },

  findDepartmentNumAndName: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.findDepartmentNumAndName();

      logger.info(`GET /api/pick/departments 200 학부 정보가 응답되었습니다.`);
      return res.status(200).json(response.departments);
    } catch (err) {
      next(err);
    }
  },

  findMajorNumAndName: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.findMajorNumAndName();

      logger.info(
        `GET /api/pick/departments/:departmentNo/majors 200 전공 정보가 응답되었습니다.`,
      );
      return res.status(200).json(response.majors);
    } catch (err) {
      next(err);
    }
  },

  createMajorByname: async (req, res, next) => {
    try {
      const user = new MajorService(req);
      const response = await user.createMajorByname();

      logger.info(`POST /api/pick/major 201 ${response.msg}`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
