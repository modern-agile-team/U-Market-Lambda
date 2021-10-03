const mysql = require("../../../config/mysql");

class ProductStorage {
  static async findHotsByLimit(limit) {
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt AS interestCnt, thumbnail FROM products AS pd
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
        SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt AS interestCnt, thumbnail FROM products AS pd
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

  static async findAllBasedPriceBy(attr) {
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, ifnull(i_pd.user_no, 0) AS interestedUserNo, interest_cnt AS interestCnt, thumbnail FROM products AS pd
        LEFT JOIN interest_products AS i_pd
        ON i_pd.product_no = pd.no
        WHERE pd.no >= ${attr.startNo}
        GROUP BY pd.no
        ORDER BY price ${attr.sort}
        LIMIT ${attr.limit};`;

      const products = await mysql.query(query);

      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductStorage;
