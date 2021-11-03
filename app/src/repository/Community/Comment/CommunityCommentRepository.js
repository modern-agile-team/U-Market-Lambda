const mysql = require("../../../config/mysql");

class CommunityCommentRepository {
  static async findAllByCommunityNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT users.nickname, users.profile_img_url AS profileImage, cmt.description, cmt.like_cnt AS likeCnt, COUNT(rp.no) AS replyCnt, DATE_FORMAT(cmt.in_date, "%Y.%m.%d") AS inDate 
        FROM community_comments AS cmt
        LEFT JOIN community_reply_comments AS rp
        ON rp.community_comment_no = cmt.no
        LEFT JOIN users
        ON cmt.user_no = users.no
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

  static async create(content, communityNo) {
    const { userNo, description, reply_flag } = content;
    try {
      await mysql.connect();
      const query = `INSERT INTO community_comments(user_no, community_no, description, like_cnt, reply_flag, delete_flag) VALUES (?, ?, ?, 0, 0, 0);`;

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

  static async updateLikeCnt(commentNo, flag) {
    try {
      await mysql.connect();

      let query = `UPDATE community_comments SET like_cnt = like_cnt - 1 WHERE no = ?;`;
      if (flag === 1)
        query = `UPDATE community_comments SET like_cnt = like_cnt + 1 WHERE no = ?;`;

      const result = await mysql.query(query, [commentNo]);
      if (result.affectedRows) {
        return flag === 1 ? "+" : "-";
      }
      throw new Error("Not Update LikeCount");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateComment(content) {
    try {
      await mysql.connect();
      const query = `UPDATE community_comments SET description = ? WHERE no = ?`;

      const result = await mysql.query(query, [
        content.description,
        content.commentNo,
      ]);
      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Update Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  // 댓글 삭제
  static async delete(commentNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM community_comments WHERE no = ?`;

      const result = await mysql.query(query, [commentNo]);
      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Delete Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async hiddenComment(commentNo) {
    try {
      await mysql.connect();
      const query = `UPDATE community_comments SET description = "댓글이 삭제되었습니다." WHERE no = ?`;

      const result = await mysql.query(query, [commentNo]);
      if (result.affectedRows) {
        return true;
      }
      throw new Error("Not Update Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = CommunityCommentRepository;
