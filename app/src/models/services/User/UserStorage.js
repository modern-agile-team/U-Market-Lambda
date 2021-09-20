const mariadb = require("../../../config/mariadb");

class UserStorage {
  static async signup(user, number) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO users(school_no, department_no, major_no, detail_major_no, grade, email, nickname, psword, salt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const result = await conn.query(query, [
        number.school,
        number.department,
        number.major,
        number.detailMajor,
        user.grade,
        user.email,
        user.nickname,
        user.psword,
        user.salt,
      ]);

      if (result.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = UserStorage;
