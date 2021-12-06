const mysql = require("../../config/mysql");

class NotificationRepository {
  static async create(userNo, info) {
    try {
      await mysql.connect();
      let query;

      if (!info.contentNo) {
        query = `INSERT INTO notifications(receiver_no, sender_no, type) VALUES (?, ?, ?);`;
        const result = await mysql.query(query, [
          userNo,
          info.writerNo,
          info.type,
        ]);

        if (result.affectedRows) return true;
        throw new Error("Not Exist User");
      }

      query = `INSERT INTO notifications(receiver_no, sender_no, content_no, type) VALUES (?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        userNo,
        info.writerNo,
        info.contentNo,
        info.type,
      ]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist User");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async createToken(userNo, token) {
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

  static async findAllByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT u.nickname, noti.type, noti.content_no AS contentNo  FROM notifications AS noti 
      LEFT JOIN users AS u
      ON u.no = sender_no
      WHERE receiver_no = ?;`;

      const result = await mysql.query(query, [userNo]);

      if (result.length) return result;
      throw new Error("no data in the database");
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

  static async update(userNo, token) {
    try {
      await mysql.connect();

      const query = `UPDATE notification_tokens SET token = ? WHERE user_no = ?`;

      const result = await mysql.query(query, [token, userNo]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist User");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async delete(token) {
    try {
      await mysql.connect();

      const query = `DELETE FROM notification_tokens WHERE token = ?`;

      const result = await mysql.query(query, [token]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist User");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = NotificationRepository;
