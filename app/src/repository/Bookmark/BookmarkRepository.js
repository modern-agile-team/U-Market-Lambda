const mysql = require("../../config/mysql");

class BookmarkRepository {
  static async findAllByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT cc.no, cc.user_no AS userNo, cc.title, cc.description, cc.like_cnt AS likeCnt, DATE_FORMAT(cc.in_date, "%Y.%m.%d") AS inDate, COUNT(com.no) AS commentCount FROM bookmark_communities AS bc
      JOIN communities AS cc
      ON cc.no = bc.community_no
      LEFT JOIN community_comments AS com
      ON com.community_no = bc.community_no
      WHERE bc.user_no = ?;`;
      const bookmark = await mysql.query(query, [userNo]);
      return bookmark;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(userNo, communityNo) {
    try {
      await mysql.connect();
      const query = `INSERT INTO bookmark_communities(user_no, community_no) VALUES(?, ?);`;
      const result = await mysql.query(query, [userNo, communityNo]);

      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Exist Community");
    } catch (err) {
      throw err;
    }
  }

  static async delete(userNo, communityNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM bookmark_communities WHERE user_no = ? AND community_no = ?;`;
      const result = await mysql.query(query, [userNo, communityNo]);

      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Exist Community");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookmarkRepository;
