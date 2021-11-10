const logger = require("../../config/logger");
const EmailService = require("../../services/Email/EmailService");
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

  update: async (req, res, next) => {
    try {
      const user = new UserService(req);
      const response = await user.update();

      logger.info(`PUT /api/user/${req.params.userNo} 201 수정 완료`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  sendEmailToAdmin: async (req, res, next) => {
    try {
      const email = new EmailService(req);
      const response = await email.sendNewUserToAdmin();

      logger.info(
        `POST /api/user/signup/email 201 관리자에게 회원인증 요청 이메일 전송 성공`,
      );
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  sendNewPsword: async (req, res, next) => {
    try {
      const email = new EmailService(req);
      const response = await email.sendNewPassword();

      logger.info(`POST /api/user/lostpassword 201 전송 성공`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const user = new UserService(req);
      const response = await user.changePassword();

      logger.info(`POST /api/user/changepassword 201 비밀번호 변경 성공`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
