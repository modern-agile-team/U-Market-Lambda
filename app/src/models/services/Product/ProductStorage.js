const mysql = require("../../../config/mysql");

class ProductStorage {
  static async findHotsByLimit(limit) {
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt FROM products AS pd
        LEFT JOIN product_comments AS p_cmt
        ON pd.no = p_cmt.product_no
        WHERE pd.in_date > (CURRENT_TIMESTAMP() - INTERVAL 7 DAY)
        GROUP BY pd.no
        ORDER BY hit DESC
        LIMIT ${limit};`;

      const hotProducts = await mysql.query(query);

      return hotProducts;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findNewsByLimit(limit) {
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt FROM products AS pd
        LEFT JOIN product_comments AS p_cmt
        ON pd.no = p_cmt.product_no
        GROUP BY pd.no
        ORDER BY pd.no DESC
        LIMIT ${limit};`;

      const newProducts = await mysql.query(query);

      return newProducts;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductStorage;
