const mysql = require("../../config/mysql");

class ProductRepository {
  static async findOneByNo(productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT users.nickname, users.profile_img_url AS profileImage, description, hit, interest_cnt AS interestCnt, bargaining_flag AS isBargaining, ts.name AS tradingStatus, ds.name AS damageStatus, direct_flag AS isDirect, delivery_flag AS isDelivery, DATE_FORMAT(pd.in_date, "%Y.%m.%d %H:%i") AS inDate
        FROM products AS pd
        JOIN trading_status AS ts
        ON pd.trading_status_no = ts.no
        JOIN damage_status AS ds
        ON pd.damage_status_no = ds.no
        JOIN users
        ON pd.user_no = users.no
        WHERE pd.no = ?;`;

      const community = await mysql.query(query, [productNo]);

      return community[0];
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

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

  static async findAllRelatedByNo(hashSql) {
    try {
      await mysql.connect();
      const query = `
        SELECT title, price, interest_cnt AS interestCnt, thumbnail
        FROM products AS pd
        LEFT JOIN product_hash_tags AS p_hs
        ON pd.no = p_hs.product_no
        LEFT JOIN hash_tags AS hs
        ON hs.no = p_hs.hash_tag_no
        WHERE ${hashSql}
        GROUP BY pd.no;`;

      const products = await mysql.query(query);

      return products;
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
          SELECT title, price, COUNT(p_cmt.no) AS commentCnt, 
            interest_cnt AS interestCnt, thumbnail 
          FROM products AS pd
          LEFT JOIN product_comments AS p_cmt
          ON pd.no = p_cmt.product_no
          WHERE pd.no >= ? AND price >= ? AND price <= ? ${filterSql}
          GROUP BY pd.no
          ORDER BY price ASC, pd.no DESC
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

  static async insertOne(product) {
    const {
      userNo,
      regionNo,
      schoolNo,
      departmentNo,
      majorNo,
      detailCategoryNo,
      title,
      price,
      isBargaining,
      description,
      thumbnail,
    } = product;
    try {
      await mysql.connect();
      const query = `
      INSERT INTO products 
      (user_no, region_no, school_no, department_no, major_no, 
        product_detail_category_no, title, price, bargaining_flag, 
        description, thumbnail) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        userNo,
        regionNo,
        schoolNo,
        departmentNo,
        majorNo,
        detailCategoryNo,
        title,
        price,
        isBargaining,
        description,
        thumbnail,
      ]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductRepository;
