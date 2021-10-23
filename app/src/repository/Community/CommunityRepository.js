const mysql = require("../../config/mysql");

class CommunityRepository {
  static async findAllAboutCategoryBy(attr, filterSql) {
    const { startNo, limit, categoryNo } = attr;
    try {
      await mysql.connect();
      const query = `
        SELECT cmu_outer.no, cmu_outer.nickname, cmu_outer.title, cmu_outer.description, cmu_outer.hit, cmu_outer.like_cnt AS likeCnt, cmu_outer.comment_cnt AS commentCnt, COUNT(bmk_cmu.no) AS bookmarkCnt, cmu_outer.thumbnail, DATE_FORMAT(cmu_outer.in_date, "%Y.%m.%d") AS inDate
        FROM (
          SELECT cmu_inner.no, users.nickname AS nickname, cmu_inner.region_no, cmu_inner.school_no, cmu_inner.department_no, cmu_inner.major_no, community_category_no, title, cmu_inner.description, hit, cmu_inner.like_cnt, COUNT(cmu_cmt.no) AS comment_cnt, thumbnail, cmu_inner.in_date
          FROM communities AS cmu_inner
          JOIN users
          ON cmu_inner.user_no = users.no
          LEFT JOIN community_comments AS cmu_cmt
          ON cmu_inner.no = cmu_cmt.community_no
          GROUP BY cmu_inner.no
          ORDER BY cmu_inner.no DESC
          LIMIT ?) AS cmu_outer
        LEFT JOIN bookmark_communities AS bmk_cmu
        ON cmu_outer.no = bmk_cmu.community_no
        WHERE cmu_outer.no >= ? AND cmu_outer.community_category_no = ? ${filterSql}
        GROUP BY cmu_outer.no
        ORDER BY cmu_outer.no DESC
        LIMIT ?;`;

      const communities = await mysql.query(query, [
        limit,
        startNo,
        categoryNo,
        limit,
      ]);

      return communities;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findOneByNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT cmu_outer.no, nickname, profile_img_url AS profileImage, cmu_outer.title, cmu_outer.description, hit, cmu_outer.like_cnt AS likeCnt, comment_cnt AS commentCnt, COUNT(bmk_cmu.no) AS bookmarkCnt, DATE_FORMAT(cmu_outer.in_date, "%Y.%m.%d %H:%i") AS inDate
        FROM (
          SELECT cmu_inner.no, users.nickname, users.profile_img_url, cmu_inner.user_no, title, cmu_inner.description, hit, cmu_inner.like_cnt, COUNT(cmu_cmt.no) AS comment_cnt, cmu_inner.in_date
          FROM communities AS cmu_inner
          LEFT JOIN community_comments AS cmu_cmt
          ON cmu_inner.no = cmu_cmt.community_no
          LEFT JOIN users
          ON users.no = cmu_inner.user_no
          GROUP BY cmu_inner.no
        ) AS cmu_outer
        LEFT JOIN bookmark_communities AS bmk_cmu
        ON cmu_outer.no = bmk_cmu.community_no
        WHERE cmu_outer.no = ?
        GROUP BY cmu_outer.no;`;

      const community = await mysql.query(query, [communityNo]);

      return community[0];
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertOne(community) {
    try {
      await mysql.connect();
      const query = `
        INSERT INTO communities (user_no, region_no, school_no, department_no, major_no, community_category_no, title, description, thumbnail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        community.userNo,
        community.regionNo,
        community.schoolNo,
        community.departmentNo,
        community.majorNo,
        community.detailCategoryNo,
        community.title,
        community.description,
        community.thumbnail,
      ]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateOneByNo(community) {
    try {
      await mysql.connect();
      const query = `UPDATE communities SET title = ?, description = ?, thumbnail = ? WHERE no = ?;`;

      const result = await mysql.query(query, [
        community.title,
        community.description,
        community.thumbnail,
        community.no,
      ]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist Community");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async deleteOneByNo(communityNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM communities WHERE no = ?;`;

      const result = await mysql.query(query, [communityNo]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist Community");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = CommunityRepository;
