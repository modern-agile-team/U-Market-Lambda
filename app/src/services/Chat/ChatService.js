const ChatRepository = require("../../repository/Chat/ChatRepository");

class ChatService {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async insertChatRoom() {
    const user = this.body;
    try {
      const isExistChatRoom = await ChatRepository.isExistChatRoom(
        user.sellerNo,
        user.buyerNo,
        user.productNo,
      );
      if (!isExistChatRoom.length) {
        const chatRoomNo = await ChatRepository.insertChatRoom(
          user.sellerNo,
          user.buyerNo,
          user.productNo,
        );

        return { chatRoomNo };
      }
      return { chatRoomNo: isExistChatRoom[0].chatRoomNo };
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserNo() {
    const userNo = this.params.userNo;
    try {
      const buyerList = await ChatRepository.findBuyerBySellerNo(userNo);
      const sellerList = await ChatRepository.findSellerByBuyerNo(userNo);

      const chatlist = [...buyerList, ...sellerList];
      return { chatlist };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ChatService;
