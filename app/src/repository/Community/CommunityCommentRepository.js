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
}

module.exports = CommunityCommentRepository;
