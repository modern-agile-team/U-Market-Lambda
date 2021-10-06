const mysql = require("../../config/mysql");

class WatchlistRepository {
  static async findAllByUserNum(user) {
    try {
      await mysql.connect();

      const query = `SELECT pr.title, pr.price, pr.interest_cnt AS likeNum, pr.hit, pr.trading_status_no AS statusNum  FROM interest_products AS ip
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

  static async isExistWatchlist(content) {
    try {
      await mysql.connect();

      const query = `SELECT * FROM interest_products WHERE user_no = ? AND product_no = ?;`;

      const result = await mysql.query(query, [
        content.userNo,
        content.productNo,
      ]);
      if (result.length > 0) throw new Error("Already Exist Watchlist");
      return true;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(content) {
    try {
      await mysql.connect();

      const query = `INSERT INTO interest_products (user_no, product_no) VALUES (?, ?)`;

      const result = await mysql.query(query, [
        content.userNo,
        content.productNo,
      ]);
      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async delete(content) {
    try {
      await mysql.connect();
      const query = `DELETE FROM interest_products WHERE user_no = ? AND product_no = ?`;

      const result = await mysql.query(query, [
        content.userNo,
        content.productNo,
      ]);

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
