const logger = require("../../config/logger");
const EmailService = require("../../services/Email/EmailService");

const process = {
  createInquiry: async (req, res, next) => {
    try {
      const user = new EmailService(req);
      const response = await user.sendInquiry();

      logger.info(`POST /inquiry 201 문의사항 보내기 성공`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
