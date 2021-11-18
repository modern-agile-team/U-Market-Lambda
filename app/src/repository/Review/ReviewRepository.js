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
}

module.exports = ReviewRepository;
