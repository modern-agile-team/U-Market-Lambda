const mariadb = require("../../../config/mariadb");

class ProductStorage {
  static async findHotsByLimit(limit) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt FROM products AS pd
        LEFT JOIN product_comments AS p_cmt
        ON pd.no = p_cmt.product_no
        WHERE pd.in_date > (CURRENT_TIMESTAMP() - INTERVAL 7 DAY)
        GROUP BY pd.no
        ORDER BY hit DESC
        LIMIT ${limit};`;

      const hotProducts = await conn.query(query);

      return hotProducts;
    } catch (err) {
      throw err;
    } finally {
      conn?.end();
    }
  }

  static async findNewsByLimit(limit) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt FROM products AS pd
        LEFT JOIN product_comments AS p_cmt
        ON pd.no = p_cmt.product_no
        GROUP BY pd.no
        ORDER BY pd.no DESC
        LIMIT ${limit};`;

      const newProducts = await conn.query(query);

      return newProducts;
    } catch (err) {
      throw err;
    } finally {
      conn?.end();
    }
  }
}

module.exports = ProductStorage;
