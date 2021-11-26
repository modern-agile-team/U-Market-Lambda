const mysql = require("../../config/mysql");

class BookmarkRepository {
  static async findAllByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT cc.no, cc.title,users.profile_img_url AS profileUrl, users.nickname, cc.description, cc.hit, cc.thumbnail, cc.like_cnt AS likeCnt, DATE_FORMAT(cc.in_date, "%Y.%m.%d") AS inDate, COUNT(cmt.no) AS commentCnt
      FROM communities AS cc
        LEFT JOIN bookmark_communities AS bc
        ON cc.no = bc.community_no
        LEFT JOIN users
        ON users.no = cc.user_no
        LEFT JOIN community_comments AS cmt
        ON cmt.community_no = bc.community_no
        WHERE bc.user_no = ?
        GROUP BY cc.no;`;
      const bookmark = await mysql.query(query, [userNo]);
      return bookmark;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findLikeByNo(userNo, communityNo) {
    try {
      await mysql.connect();
      const query = `SELECT no FROM bookmark_communities WHERE community_no = ? AND user_no = ?;`;
      const bookmark = await mysql.query(query, [communityNo, userNo]);
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
