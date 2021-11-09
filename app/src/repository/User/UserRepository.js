const mysql = require("../../config/mysql");

class UserRepository {
  static async signup(user) {
    try {
      await mysql.connect();
      const query = `INSERT INTO users(region_no, school_no, major_no, email, name, nickname, psword, salt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const result = await mysql.query(query, [
        user.regionNum,
        user.schoolNum,
        user.majorNum,
        user.email,
        user.name,
        user.nickname,
        user.psword,
        user.salt,
      ]);
      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findAllByEmail(user) {
    try {
      await mysql.connect();

      const query = `SELECT no AS userNo,region_no AS regionNum, school_no AS schoolNum, major_no AS majorNum,
      grade, nickname, psword, salt, profile_img_url AS profileURL, trust_score AS trustScore FROM users WHERE email = ?;`;

      const result = await mysql.query(query, [user.email]);
      if (result.length > 0) return result[0];
      throw new Error("Not Exist Email");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllByNickname(user) {
    try {
      await mysql.connect();

      const query = `SELECT u.no AS userNum, u.nickname, u.email, u.profile_img_url AS profileURL, u.trust_score AS trustScore, count(rv.no) AS tradeCount FROM users AS u
      JOIN reviews AS rv
       WHERE nickname = ? AND ((rv.seller_no = u.no AND writer = 1) OR (rv.buyer_no = u.no AND writer = 0));`;

      const result = await mysql.query(query, [user.nickname]);
      if (result.length > 0) return result[0];
      throw new Error("Not Exist Nickname");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async isExistUserByNameAndEmail(user) {
    try {
      await mysql.connect();

      const query = `SELECT no FROM users WHERE name = ? AND email = ?;`;
      const result = await mysql.query(query, [user.name, user.email]);
      if (result[0].no) return result[0].no;
      throw new Error("Do not match name and email");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updatePassword(no, user) {
    try {
      await mysql.connect();

      const query = `UPDATE users SET psword = ?, salt = ? WHERE no = ?;`;
      const result = await mysql.query(query, [user.psword, user.salt, no]);
      if (result.affectedRows) return true;
      throw new Error("Not Exist User");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async isExistUserByNoAndPsword(user) {
    try {
      await mysql.connect();

      const query = `SELECT no, psword, salt FROM users WHERE no = ?;`;
      const result = await mysql.query(query, [user.userNo]);

      if (result[0].no) return result[0];
      throw new Error("Wrong Password");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = UserRepository;
