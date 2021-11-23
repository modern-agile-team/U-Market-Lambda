const mysql = require("../../../config/mysql");

class CommunityReplyRepository {
  static async findAllByCommunityNo(userNo, commentNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT rp.user_no AS writerNo, users.nickname, users.profile_img_url AS profileUrl, rp.no AS replyNo, rp.community_comment_no AS commentNo, rp.description, COUNT(li.no) AS likeFlag, rp.like_cnt AS likeCnt, DATE_FORMAT(rp.in_date, "%Y.%m.%d") AS inDate 
        FROM community_replies AS rp
        LEFT JOIN users
        ON users.no = rp.user_no
        LEFT JOIN number_of_likes_community_replies AS li
        ON li.user_no = ? AND rp.no = li.reply_no
        WHERE rp.community_comment_no = ?
        GROUP BY rp.no;`;

      const replies = await mysql.query(query, [userNo, commentNo]);

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
    const { commentNo, userNo, description } = content;
    try {
      await mysql.connect();
      const query = `INSERT INTO community_replies(user_no, description, community_comment_no, like_cnt) VALUES (?, ?, ?, 0);`;

      const comments = await mysql.query(query, [
        userNo,
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

  static async registerUserByNo(replyNo, information) {
    const { userNo, flag } = information;
    try {
      await mysql.connect();

      let query = `DELETE FROM number_of_likes_community_replies WHERE user_no = ? AND reply_no = ?;`;
      if (flag === 1)
        query = `INSERT INTO number_of_likes_community_replies(user_no, reply_no) VALUES(?, ?);`;

      const result = await mysql.query(query, [userNo, replyNo]);
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
