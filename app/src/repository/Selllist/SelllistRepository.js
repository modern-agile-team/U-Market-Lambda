const mysql = require("../../config/mysql");

class SelllistRepository {
  static async findAllByUserNo(user) {
    const { userNo } = user;
    try {
      await mysql.connect();
      const query = `SELECT title, price, thumbnail, interest_cnt AS interest, DATE_FORMAT(in_date, "%Y.%m.%d") AS inDate FROM products WHERE user_no = ? AND trading_status_no = 1;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SelllistRepository;
