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
        LIMIT ?;`;

      const hotProducts = await mysql.query(query, [limit]);

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
        LIMIT ?;`;

      const newProducts = await mysql.query(query, [limit]);

      return newProducts;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllBasedPriceBy(attr) {
    const { startNo, sort, limit } = attr;
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, ifnull(i_pd.user_no, 0) AS interestedUserNo, interest_cnt AS interestCnt, thumbnail FROM products AS pd
        LEFT JOIN interest_products AS i_pd
        ON i_pd.product_no = pd.no
        WHERE pd.no >= ?
        GROUP BY pd.no
        ORDER BY price ${sort}
        LIMIT ?;`;

      const products = await mysql.query(query, [startNo, limit]);

      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllAboutMarketBasedPriceBy(attr, filterSql) {
    const { startNo, startPriceRange, endPriceRange, limit } = attr;
    try {
      await mysql.connect();
      const query = `
          SELECT title, price, COUNT(p_cmt.no) AS commentCnt, interest_cnt AS interestCnt, thumbnail FROM products AS pd
          LEFT JOIN product_comments AS p_cmt
          ON pd.no = p_cmt.product_no
          WHERE pd.no >= ? AND price >= ? AND price <= ? ${filterSql}
          GROUP BY pd.no
          ORDER BY price ASC
          LIMIT ?;`;

      const products = await mysql.query(query, [
        startNo,
        startPriceRange,
        endPriceRange,
        limit,
      ]);

      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllOfViewedByUserNo(userNo, attr) {
    const { startNo, limit } = attr;
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, t_status.name AS tradingStatus ,interest_cnt AS interestCnt, thumbnail, DATE_FORMAT(in_date, "%Y.%m.%d") AS inDate FROM products AS pd
        JOIN viewed_products AS v_pd
        ON pd.no = v_pd.product_no
        JOIN trading_status AS t_status
        ON pd.trading_status_no = t_status.no
        WHERE pd.user_no = ? AND pd.no >= ?
        ORDER BY v_pd.no DESC
        LIMIT ?;`;

      const products = await mysql.query(query, [userNo, startNo, limit]);

      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductStorage;
