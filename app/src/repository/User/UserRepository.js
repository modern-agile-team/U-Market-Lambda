const mysql = require("../../config/mysql");

class UserRepository {
  static async signup(user) {
    try {
      await mysql.connect();
      const query = `INSERT INTO users(region_no, school_no, major_no, grade, email, nickname, psword, salt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const result = await mysql.query(query, [
        user.regionNum,
        user.schoolNum,
        user.majorNum,
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
      await mysql?.end();
    }
  }

  static async findAllByEmail(user) {
    try {
      await mysql.connect();

      const query = `SELECT region_no AS regionNum, school_no AS schoolNum, major_no AS majorNum,
      grade, nickname, psword, salt FROM users WHERE email = ?;`;

      const result = await mysql.query(query, [user.email]);
      return result[0];
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = UserRepository;
