const mysql = require("../../../config/mysql");

class CommunityRepository {
  static async findAllAboutCategoryBy(attr, filterSql) {
    const { startNo, limit, categoryNo } = attr;
    try {
      await mysql.connect();
      const query = `
        SELECT cmu_outer.title, cmu_outer.description, cmu_outer.hit, cmu_outer.like_cnt AS likeCnt, cmu_outer.comment_cnt AS commentCnt, COUNT(bmk_cmu.no) AS bookmarkCnt, cmu_outer.thumbnail, DATE_FORMAT(cmu_outer.in_date, "%Y.%m.%d") AS inDate
        FROM (
          SELECT cmu_inner.no, region_no, school_no, department_no, major_no, community_category_no, title, cmu_inner.description, hit, like_cnt, COUNT(cmu_cmt.no) AS comment_cnt, thumbnail, cmu_inner.in_date
          FROM communities AS cmu_inner
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
}

module.exports = CommunityRepository;
