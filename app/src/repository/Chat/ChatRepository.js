const mysql = require("../../config/mysql");

class ChatRepository {
  static async findAllByBuyerNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT c.no AS chatRoomNo, c.buyer_no AS userNo, c.product_title AS title, users.nickname, users.profile_img_url AS profileUrl
      FROM chat_lists AS c
      LEFT JOIN users
      ON users.no = c.buyer_no
      WHERE c.seller_no = ?;`;

      const chatList = await mysql.query(query, [userNo]);
      return chatList;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllBySellerNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT c.no AS chatRoomNo, c.seller_no AS userNo, c.product_title AS title, users.nickname, users.profile_img_url AS profileUrl
      FROM chat_lists AS c
      LEFT JOIN users
      ON users.no = c.seller_no
      WHERE c.buyer_no = ?;`;

      const chatList = await mysql.query(query, [userNo]);
      return chatList;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async isExistChatRoom(sellerNo, buyerNo) {
    try {
      await mysql.connect();

      const query = `SELECT no AS chatRoomNo FROM chat_lists WHERE seller_no = ? AND buyer_no = ?;`;

      const result = await mysql.query(query, [sellerNo, buyerNo]);

      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertChatRoom(sellerNo, buyerNo, title) {
    try {
      await mysql.connect();

      const query = `INSERT INTO chat_lists (seller_no, buyer_no, product_title) VALUES (?, ?, ?);`;

      const result = await mysql.query(query, [sellerNo, buyerNo, title]);

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
