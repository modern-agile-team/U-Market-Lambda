const mysql = require("../../config/mysql");

class Buylistrepository {
  static async findAllByUserNoAndProductNo(user) {
    const { userNo } = user;
    try {
      await mysql.connect();
      const query = `SELECT pro.title, pro.price, pro.thumbnail, pro.interest_cnt AS likeCnt, DATE_FORMAT(pro.in_date, "%Y.%m.%d") AS inDate FROM reviews AS rv
      JOIN products pro
      ON pro.no = rv.product_no
      WHERE rv.buyer_no = ? AND rv.writer = 0;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = Buylistrepository;
