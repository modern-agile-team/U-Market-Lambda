const mysql = require("../../config/mysql");

class WatchlistRepository {
  static async findAllByUserNum(user) {
    try {
      await mysql.connect();

      const query = `SELECT pr.no, pr.title, pr.price, pr.interest_cnt AS likeCnt, pr.thumbnail, pr.trading_status_no AS statusNum, DATE_FORMAT(pr.in_date, "%Y.%m.%d") AS inDate  FROM interest_products AS ip
      JOIN products AS pr
      ON pr.no = ip.product_no
       WHERE ip.user_no = ?;`;

      const result = await mysql.query(query, [user.userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async isExistWatchlist(userNo, productNo) {
    try {
      await mysql.connect();

      const query = `SELECT no AS no FROM interest_products WHERE user_no = ? AND product_no = ?;`;

      const result = await mysql.query(query, [userNo, productNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(content) {
    const { userNo, productNo } = content;
    try {
      await mysql.connect();

      const query = `INSERT INTO interest_products (user_no, product_no) VALUES (?, ?)`;

      const result = await mysql.query(query, [userNo, productNo]);
      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async delete(content) {
    const { userNo, productNo } = content;
    try {
      await mysql.connect();
      const query = `DELETE FROM interest_products WHERE user_no = ? AND product_no = ?`;

      const result = await mysql.query(query, [userNo, productNo]);

      if (result.affectedRows) return true;
      throw new Error("no data in the database");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = WatchlistRepository;
