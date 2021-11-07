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
}

module.exports = BookmarkRepository;
