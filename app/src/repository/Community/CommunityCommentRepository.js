const mysql = require("../../config/mysql");

class CommunityCommentRepository {
  static async findAllByCommunityNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT users.nickname, users.profile_img_url AS profileImage, cmt.description, cmt.like_cnt AS likeCnt, COUNT(rp.no) AS replyCnt 
        FROM community_comments AS cmt
        LEFT JOIN community_reply_comments AS rp
        ON rp.community_comment_no = cmt.no
        LEFT JOIN users
        ON users.no = cmt.user_no
        WHERE cmt.community_no = ?
        GROUP BY cmt.no;`;

      const comments = await mysql.query(query, [communityNo]);

      return comments;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async Create(content) {
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
    }
  }
}

module.exports = CommunityCommentRepository;
