const mysql = require("../../config/mysql");

class ChatRepository {
  static async insertChatRoom(userNo, writerNo) {
    try {
      await mysql.connect();

      const query = `INSERT INTO chat_lists (user_no, writer_no) VALUES (?, ?);`;

      const result = await mysql.query(query, [userNo, writerNo]);

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
