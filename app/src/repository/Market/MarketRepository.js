const mysql = require("../../config/mysql");

class MarketRepository {
  constructor(req) {
    this.body = req.body;
  }

  static async findAllByNum() {
    const data = this.body;
    try {
      await mysql.connect();

      const query = `SELECT * FROM products WHERE no = ?`;
      const result = mysql.query(query, [data.num]);
      if (result.length > 0) return result;
      return false;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MarketRepository;
