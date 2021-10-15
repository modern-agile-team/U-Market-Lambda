const mysql = require("../../config/mysql");

class SelllistRepository {
  static async findAllByUserNo(user, statusNo) {
    const { userNo } = user;
    try {
      await mysql.connect();
      const query = `SELECT title, price, thumbnail, interest_cnt AS likeCnt, DATE_FORMAT(in_date, "%Y.%m.%d") AS inDate FROM products WHERE user_no = ? AND trading_status_no = ?;`;

      const result = await mysql.query(query, [userNo, statusNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = SelllistRepository;
