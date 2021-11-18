const mysql = require("../../config/mysql");

class ChatRepository {
  static async findBuyerBySellerNo(userNo) {
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

  static async findSellerByBuyerNo(userNo) {
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

  static async findOneProductBuyerBySellerNo(userNo, productNo) {
    try {
      await mysql.connect();
      const query = `SELECT c.buyer_no AS userNo, c.product_title AS title, users.nickname, users.profile_img_url AS profileUrl, pro.thumbnail, pc.name AS category
      FROM chat_lists AS c
      LEFT JOIN users
      ON users.no = c.buyer_no
      LEFT JOIN products AS pro
      ON c.product_no = pro.no
      LEFT JOIN product_detail_categories AS pc
      ON pc.no = pro.product_detail_category_no
      WHERE c.seller_no = ? AND c.product_no = ?;`;

      const chatList = await mysql.query(query, [userNo, productNo]);
      return chatList;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async isExistChatRoom(sellerNo, buyerNo, productNo) {
    try {
      await mysql.connect();

      const query = `SELECT no AS chatRoomNo FROM chat_lists WHERE seller_no = ? AND buyer_no = ? AND product_no = ?;`;

      const result = await mysql.query(query, [sellerNo, buyerNo, productNo]);

      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertChatRoom(sellerNo, buyerNo, productNo, title) {
    try {
      await mysql.connect();

      const query = `INSERT INTO chat_lists (seller_no, buyer_no, product_no, product_title) VALUES (?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        sellerNo,
        buyerNo,
        productNo,
        title,
      ]);

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
