const mysql = require("../../config/mysql");

class InquiryRepository {
  static async findAllByUserNo(userNo) {
    try {
      const query = `SELECT email, name, nickname FROM users WHERE no = ?;`;
      await mysql.connect();
      const userInfo = await mysql.query(query, [userNo]);
      return userInfo;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }
}

module.exports = InquiryRepository;
