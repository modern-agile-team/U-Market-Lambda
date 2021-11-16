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
        user.sellerNo,
        user.buyerNo,
      );

      return { chatRoomNo };
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserNo() {
    const userNo = this.params.userNo;
    try {
      const chatlist = await ChatRepository.findAllByUserNo(userNo);
      return { chatlist };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ChatService;
