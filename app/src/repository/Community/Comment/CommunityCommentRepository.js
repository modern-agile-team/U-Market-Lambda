const mysql = require("../../../config/mysql");

class CommunityCommentRepository {
  static async findAllByCommunityNo(userNo, communityNo) {
    try {
      await mysql.connect();
      const query = `
      SELECT cmt.user_no AS writerNo, users.nickname, users.profile_img_url AS profileUrl, cmt.no AS commentNo, cmt.description, cmt.like_cnt AS likeCnt, (SELECT COUNT(lcc.no) FROM number_of_likes_community_comments AS lcc
      where lcc.comment_no = cmt.no  AND lcc.user_no = ?) AS likeFlag, COUNT(rp.no) AS replyCnt, cmt.delete_flag AS deleteFlag, DATE_FORMAT(cmt.in_date, "%Y.%m.%d") AS inDate 
      FROM community_comments AS cmt
      LEFT JOIN community_replies AS rp
      ON rp.community_comment_no = cmt.no
      LEFT JOIN users
      ON cmt.user_no = users.no
      WHERE cmt.community_no = ?
      GROUP BY cmt.no;`;

      const comments = await mysql.query(query, [userNo, communityNo]);

      return comments;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findCountReplyByCommentNo(commentNo) {
    try {
      await mysql.connect();
      const query = `
      SELECT (case cc.delete_flag  when '1' then COUNT(rp.no) when '0' then 1 end) AS count FROM community_comments AS cc 
      LEFT JOIN community_replies AS rp
      ON cc.no = rp.community_comment_no
      where cc.no = ?;`;

      const result = await mysql.query(query, [commentNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async create(content) {
    const { userNo, description, communityNo } = content;
    try {
      await mysql.connect();
      const query = `INSERT INTO community_comments(user_no, community_no, description, like_cnt, delete_flag) VALUES (?, ?, ?, 0, 0);`;

      const comments = await mysql.query(query, [
        userNo,
        communityNo,
        description,
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
      throw new Error("Not Exist Comment");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async registerUserByNo(commentNo, information) {
    const { userNo, flag } = information;
    try {
      await mysql.connect();

      let query = `DELETE FROM number_of_likes_community_comments WHERE user_no = ? AND comment_no = ?;`;
      if (flag === 1)
        query = `INSERT INTO number_of_likes_community_comments(user_no, comment_no) VALUES(?, ?);`;

      const result = await mysql.query(query, [userNo, commentNo]);
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

  static async updateComment(content, commentNo) {
    try {
      await mysql.connect();
      const query = `UPDATE community_comments SET description = ? WHERE no = ?`;

      const result = await mysql.query(query, [content.description, commentNo]);
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

  // 댓글 삭제
  static async delete(commentNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM community_comments WHERE no = ?`;

      const result = await mysql.query(query, [commentNo]);
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

  static async hiddenComment(commentNo) {
    try {
      await mysql.connect();
      const query = `UPDATE community_comments SET description = "댓글이 삭제되었습니다.", delete_flag = 1 WHERE no = ?`;

      const result = await mysql.query(query, [commentNo]);
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

module.exports = CommunityCommentRepository;
