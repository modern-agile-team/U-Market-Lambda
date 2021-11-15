const ChatRepository = require("../../repository/Chat/ChatRepository");

class ChatService {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async insertChatRoom() {
    const user = this.body;
    try {
      const chatRoomNo = await ChatRepository.insertChatRoom(
        user.userNo,
        user.writerNo,
      );

      return { chatRoomNo };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ChatService;
