const logger = require("../../config/logger");

const NotificationService = require("../../services/Notification/NotificationService");

const process = {
  create: async (req, res, next) => {
    try {
      const notificationService = new NotificationService(req);
      const response = await notificationService.create();

      logger.info(`POST /api/notification/${req.params.userNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  findTokenByUserNo: async (req, res, next) => {
    try {
      const notificationService = new NotificationService(req);
      const response = await notificationService.findTokenByUserNo();

      logger.info(`GET /api/notification/${req.params.userNo} 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const notificationService = new NotificationService(req);
      const response = await notificationService.update();

      logger.info(`PATCH /api/notification/${req.params.userNo} 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const notificationService = new NotificationService(req);
      const response = await notificationService.delete();

      logger.info(`DELETE /api/notification 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
