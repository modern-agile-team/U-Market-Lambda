const mysql = require("../../config/mysql");

class ChatRepository {
  static async findAllByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT c.no AS channelName, c.seller_no AS sellerNo, c.buyer_no AS buyerNo, 
      (SELECT users.nickname FROM users WHERE users.no = sellerNo) AS sellerNickname, (SELECT users.nickname FROM users WHERE users.no = buyerNo) AS buyerNickname
      FROM chat_lists AS c
      WHERE c.seller_no = ? OR c.buyer_no = ?;`;

      const chatList = await mysql.query(query, [userNo, userNo]);
      return chatList;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertChatRoom(sellerNo, buyerNo) {
    try {
      await mysql.connect();

      const query = `INSERT INTO chat_lists (seller_no, buyer_no) VALUES (?, ?);`;

      const result = await mysql.query(query, [sellerNo, buyerNo]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async deleteOneByNo(userNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM chat_lists WHERE user_no = ?;`;

      const result = await mysql.query(query, [userNo]);

      if (result.affectedRows) return true;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ChatRepository;
