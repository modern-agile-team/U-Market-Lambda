const mysql = require("../../config/mysql");

class ProductRepository {
  static async findOneByNo(productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT pd.no, pd.user_no AS sellerNo, users.nickname, users.profile_img_url AS profileUrl, pd.thumbnail, 
        pd_ctg.name AS categoryName, pd_d_ctg.name AS detailCategoryName,
        product_detail_category_no AS detailCategoryNo, title, price, description, 
        hit, interest_cnt AS interestCnt, bargaining_flag AS isBargaining, 
        ts.name AS tradingStatus, ds.name AS damageStatus, direct_flag AS isDirect, 
        delivery_flag AS isDelivery, DATE_FORMAT(pd.in_date, "%Y.%m.%d %H:%i") AS inDate
        FROM products AS pd
        JOIN trading_status AS ts
        ON pd.trading_status_no = ts.no
        JOIN damage_status AS ds
        ON pd.damage_status_no = ds.no
        JOIN users
        ON pd.user_no = users.no
        JOIN product_detail_categories AS pd_d_ctg
        ON pd.product_detail_category_no = pd_d_ctg.no
        JOIN product_categories AS pd_ctg
        ON pd_d_ctg.product_category_no = pd_ctg.no
        WHERE pd.no = ?
        LIMIT 20;`;

      const product = await mysql.query(query, [productNo]);

      return product[0];
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
        SELECT pd.no, title, price, interest_cnt AS interestCnt, thumbnail 
        FROM products AS pd
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
        SELECT pd.no, title, price, interest_cnt AS interestCnt, thumbnail FROM products AS pd
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

  static async findAllRelatedByNo(detailCategoryNo, productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT no, title, price, interest_cnt AS interestCnt, thumbnail
        FROM products AS pd
        WHERE pd.product_detail_category_no = ? AND !(pd.no = ?)
        GROUP BY pd.no;`;

      const products = await mysql.query(query, [detailCategoryNo, productNo]);

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
        SELECT pd.no, title, price, ifnull(i_pd.user_no, 0) AS interestedUserNo, interest_cnt AS interestCnt, thumbnail 
        FROM products AS pd
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
          SELECT pd.no, title, price,
            interest_cnt AS interestCnt, thumbnail 
          FROM products AS pd
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
        SELECT pd.no, title, price, t_status.name AS tradingStatus ,interest_cnt AS interestCnt, thumbnail, DATE_FORMAT(in_date, "%Y.%m.%d") AS inDate FROM products AS pd
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

  static async findTradeFinishByUserNo(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT pro.no, pro.title, pro.thumbnail, users.nickname, users.no AS buyerNo
      FROM products AS pro
      LEFT JOIN purchase_products AS pp
      ON pp.product_no = pro.no
      LEFT JOIN users
      ON users.no = pp.user_no
      WHERE pro.user_no = ? AND pro.trading_status_no = 3;`;

      const products = await mysql.query(query, [userNo]);
      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findTradeBySeller(userNo) {
    try {
      await mysql.connect();
      const query = `SELECT pro.no, pro.title, pro.thumbnail, u.nickname, pro.user_no AS sellerNo
      FROM purchase_products AS pp
      LEFT JOIN products AS pro
      ON pro.no = pp.product_no
      LEFT JOIN users AS u
      ON u.no = pro.user_no
       WHERE pp.user_no = ?;`;

      const products = await mysql.query(query, [userNo]);
      return products;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllByProductNo(productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT pro.no, pro.title, pro.thumbnail, users.nickname, users.no AS buyerNo, pdc.name AS category
        FROM products AS pro
        LEFT JOIN users
        ON users.no = pro.user_no
        LEFT JOIN product_detail_categories AS pdc
        ON pdc.no = pro.product_detail_category_no
        WHERE pro.no = ?;`;

      const product = await mysql.query(query, [productNo]);

      return product;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllByDetailCategory(category) {
    try {
      await mysql.connect();
      const query = `
        SELECT pd.no, pd.title, pd.price,
        pd.interest_cnt AS interestCnt, pd.thumbnail 
        FROM product_detail_categories AS pdc
        RIGHT JOIN products AS pd
        ON pdc.no = pd.product_detail_category_no
        WHERE pdc.name = ?
        ORDER BY pd.no DESC;
      `;

      const product = await mysql.query(query, [category]);

      return product;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllByCategory(category) {
    try {
      await mysql.connect();
      const query = `
        SELECT pd.no, pd.title, pd.price,
        pd.interest_cnt AS interestCnt, pd.thumbnail 
        FROM product_categories AS pc
        LEFT JOIN product_detail_categories AS pdc
        ON pc.no = pdc.product_category_no
        RIGHT JOIN products AS pd
        ON pdc.no = pd.product_detail_category_no
        WHERE pc.no = ?
        ORDER BY pd.no DESC;
      `;

      const product = await mysql.query(query, [category]);

      return product;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAllBySearch(word) {
    try {
      await mysql.connect();
      const query = `SELECT no, title, price, interest_cnt AS interestCnt, thumbnail 
      FROM products
      WHERE MATCH(title, description) against(? IN BOOLEAN MODE)
      ORDER BY no DESC;`;

      const product = await mysql.query(query, [word]);
      return product;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertOne(product) {
    try {
      await mysql.connect();
      const query = `
      INSERT INTO products 
      (user_no, region_no, school_no, department_no, major_no, 
        product_detail_category_no, title, price, bargaining_flag, 
        description, thumbnail) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        product.userNo,
        product.regionNo,
        product.schoolNo,
        product.departmentNo,
        product.majorNo,
        product.detailCategoryNo,
        product.title,
        product.price,
        product.isBargaining,
        product.description,
        product.thumbnail,
      ]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateInterestByProductNo(productNo, sign) {
    try {
      await mysql.connect();
      let query = `UPDATE products SET interest_cnt = interest_cnt + 1 WHERE no = ?;`;
      if (sign === "-")
        query = `UPDATE products SET interest_cnt = interest_cnt - 1 WHERE no = ?;`;

      const result = await mysql.query(query, [productNo]);
      if (result.affectedRows) return true;
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateHitByProductNo(productNo) {
    try {
      await mysql.connect();
      const query = `UPDATE products SET hit = hit + 1 WHERE no = ?;`;

      const result = await mysql.query(query, [productNo]);
      if (result.affectedRows) return true;
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateStatus(productNo, status) {
    try {
      await mysql.connect();
      const query = `UPDATE products SET trading_status_no = ? WHERE no = ?;`;
      const result = await mysql.query(query, [status, productNo]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateOneByNo(product) {
    try {
      await mysql.connect();
      const query = `UPDATE products SET title = ?, price = ?, description = ?, thumbnail = ?, bargaining_flag = ?, damage_status_no = ?, direct_flag = ?, delivery_flag = ? WHERE no = ?;`;

      const result = await mysql.query(query, [
        product.title,
        product.price,
        product.description,
        product.thumbnail,
        product.isBargaining,
        product.damageStatusNo,
        product.tradingMethods.isDirect,
        product.tradingMethods.isDelivery,
        product.no,
      ]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async deleteOneByNo(productNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM products WHERE no = ?;`;

      const result = await mysql.query(query, [productNo]);

      if (result.affectedRows) return true;
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductRepository;
