const mysql = require("../../config/mysql");

class NotificationRepository {
  static async create(userNo, token) {
    try {
      await mysql.connect();

      const query = `INSERT INTO notification_tokens(user_no, token) VALUES (?, ?)`;

      const result = await mysql.query(query, [userNo, token]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist User");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findTokenByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT token FROM notification_tokens WHERE user_no = ?`;

      const result = await mysql.query(query, [userNo]);

      if (result.length) return result;
      throw new Error("no data in the database");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = NotificationRepository;
