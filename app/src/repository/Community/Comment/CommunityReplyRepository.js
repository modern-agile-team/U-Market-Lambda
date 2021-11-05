const mysql = require("../../../config/mysql");

class CommunityReplyRepository {
  static async findAllByCommunityNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT users.nickname, users.profile_img_url AS profileImage, rp.no AS replyNo, rp.community_comment_no AS commentNo, rp.description, rp.like_cnt AS likeCnt, DATE_FORMAT(rp.in_date, "%Y.%m.%d") AS inDate 
        FROM community_replies AS rp
        LEFT JOIN users
        ON users.no = rp.user_no
        WHERE rp.community_no = ?
        GROUP BY rp.no;`;

      const replies = await mysql.query(query, [communityNo]);

      return replies;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findReplyCountByCommentNo(commentNo) {
    try {
      await mysql.connect();
      const query = `SELECT COUNT(no) AS commentCount FROM community_replies WHERE community_comment_no = ?;`;

      const result = await mysql.query(query, [commentNo]);

      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(content) {
    const { communityNo, commentNo, userNo, description } = content;
    try {
      await mysql.connect();
      const query = `INSERT INTO community_replies(user_no, community_no, description, community_comment_no, like_cnt) VALUES (?, ?, ?, ?, 0);`;

      const comments = await mysql.query(query, [
        userNo,
        communityNo,
        description,
        commentNo,
      ]);

      if (comments.affectedRows) {
        return true;
      }
      throw new Error("Create Fail Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateLikeCnt(replyNo, flag) {
    try {
      await mysql.connect();
      let query = `UPDATE community_replies SET like_cnt = like_cnt - 1 WHERE no = ?;`;
      if (flag === 1)
        query = `UPDATE community_replies SET like_cnt = like_cnt + 1 WHERE no = ?;`;

      const result = await mysql.query(query, [replyNo]);
      if (result.affectedRows) {
        return flag === 1 ? "+" : "-";
      }
      throw new Error("Not Exist Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateReply(content, replyNo) {
    const { description } = content;
    try {
      await mysql.connect();
      const query = `UPDATE community_replies SET description = ? WHERE no = ?`;

      const result = await mysql.query(query, [description, replyNo]);
      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Exist Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async deleteReply(replyNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM community_replies WHERE no = ?;`;

      const result = await mysql.query(query, [replyNo]);

      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Exist Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = CommunityReplyRepository;
