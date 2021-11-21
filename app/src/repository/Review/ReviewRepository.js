const mysql = require("../../config/mysql");

class ReviewRepository {
  static async createReview(information) {
    const { productNo, sellerNo, buyerNo, description, trustScore, writer } =
      information;
    try {
      await mysql.connect();

      const query = `INSERT INTO reviews(product_no, seller_no, buyer_no, description, trust_score, writer) VALUES (?, ?, ?, ?, ?, ?);`;
      const result = await mysql.query(query, [
        productNo,
        sellerNo,
        buyerNo,
        description,
        trustScore,
        writer,
      ]);
      if (result.affectedRows) return true;
      throw new Error("Not Exist Referenced Row");
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateTrustScore(trustScore, userNo) {
    try {
      await mysql.connect();

      const query = `UPDATE users SET trust_score = ? WHERE no = ?;`;
      const result = await mysql.query(query, [trustScore, userNo]);
      if (result.affectedRows) return true;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async createBuyer(userNo, productNo) {
    try {
      await mysql.connect();
      const query = `INSERT INTO purchase_products(user_no, product_no) VALUES(?, ?);`;
      const result = await mysql.query(query, [userNo, productNo]);
      if (result.affectedRows) return true;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findWriteBySellerNo(userNo) {
    try {
      await mysql.connect();

      const query = `SELECT reviews.no, reviews.product_no AS productNo, reviews.description, pro.title, pro.thumbnail, reviews.trust_score AS trustScore, u.nickname, DATE_FORMAT(reviews.in_date, "%Y.%m.%d %H:%i") AS inDate
      FROM reviews
      LEFT JOIN products AS pro
      ON pro.no = reviews.product_no
      LEFT JOIN users AS u
      ON u.no = reviews.buyer_no
       WHERE seller_no = ? AND writer = 0;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findWriteByBuyerNo(userNo) {
    try {
      await mysql.connect();

      const query = `SELECT reviews.no, reviews.product_no AS productNo, pro.title, reviews.description, pro.thumbnail, reviews.trust_score AS trustScore, u.nickname, DATE_FORMAT(reviews.in_date, "%Y.%m.%d %H:%i") AS inDate 
      FROM reviews
      LEFT JOIN products AS pro
      ON pro.no = reviews.product_no
      LEFT JOIN users AS u
      ON u.no = reviews.seller_no
       WHERE buyer_no = ? AND writer = 1;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findReceivedReviewBySellerNo(userNo) {
    try {
      await mysql.connect();

      const query = `SELECT reviews.no, reviews.product_no AS productNo, pro.title, reviews.description, pro.thumbnail, reviews.trust_score AS trustScore, u.nickname, DATE_FORMAT(reviews.in_date, "%Y.%m.%d %H:%i") AS inDate
      FROM reviews
      LEFT JOIN products AS pro
      ON pro.no = reviews.product_no
      LEFT JOIN users AS u
      ON u.no = reviews.buyer_no
       WHERE seller_no = ? AND writer = 1;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findReceivedReviewByBuyerNo(userNo) {
    try {
      await mysql.connect();

      const query = `SELECT reviews.no, reviews.product_no AS productNo, pro.title, pro.thumbnail, reviews.description, reviews.trust_score AS trustScore, u.nickname, DATE_FORMAT(reviews.in_date, "%Y.%m.%d %H:%i") AS inDate 
      FROM reviews
      LEFT JOIN products AS pro
      ON pro.no = reviews.product_no
      LEFT JOIN users AS u
      ON u.no = reviews.seller_no
       WHERE buyer_no = ? AND writer = 0;`;

      const result = await mysql.query(query, [userNo]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ReviewRepository;
