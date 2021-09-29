const mysql = require("../../../config/mysql");

class UserStorage {
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
}

module.exports = UserStorage;
