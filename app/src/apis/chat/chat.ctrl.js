const logger = require("../../config/logger");
const ChatService = require("../../services/Chat/ChatService");

const process = {
  insertChatRoom: async (req, res, next) => {
    try {
      const chatService = new ChatService(req);
      const response = await chatService.insertChatRoom();

      logger.info(`POST /api/chat 201`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAllByUserNo: async (req, res, next) => {
    try {
      const chatService = new ChatService(req);
      const response = await chatService.findAllByUserNo();

      logger.info(`GET /api/chat/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
