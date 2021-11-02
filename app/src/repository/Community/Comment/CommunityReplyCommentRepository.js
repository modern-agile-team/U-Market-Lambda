const mysql = require("../../../config/mysql");

class CommunityReplyCommentRepository {
  static async findAllByCommunityNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT users.nickname, users.profile_img_url AS profileImage, rp.description, rp.like_cnt AS likeCnt, DATE_FORMAT(rp.in_date, "%Y.%m.%d") AS inDate 
        FROM community_reply_comments AS rp
        LEFT JOIN users
        ON users.no = cmt.user_no
        WHERE rp.community_no = ?
        GROUP BY rp.no;`;

      const replyComments = await mysql.query(query, [communityNo]);

      return replyComments;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(content) {
    const { userNo, communityNo, description, reply_flag } = content;
    try {
      await mysql.connect();
      const query = `INSERT INTO community_comments(user_no, community_no, description, like_cnt, reply_flag, delete_flag) VALUES (?, ?, ?, 0, ?, 0);`;

      const comments = await mysql.query(query, [
        userNo,
        communityNo,
        description,
        reply_flag,
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

  static async updateLikeCnt(commentNo) {
    try {
      await mysql.connect();
      const query = `UPDATE community_comments SET like_cnt = like_cnt + 1 WHERE no = ?;`;

      const result = await mysql.query(query, [commentNo]);
      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Update LikeCount");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = CommunityReplyCommentRepository;
