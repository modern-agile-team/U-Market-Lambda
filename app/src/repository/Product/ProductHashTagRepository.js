const mysql = require("../../config/mysql");

class ProductHashTagRepository {
  static async findAllByProductNo(productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT hs.name FROM product_hash_tags AS p_hs
        JOIN products AS pd
        ON p_hs.product_no = pd.no
        JOIN hash_tags AS hs
        ON hs.no = p_hs.hash_tag_no
        WHERE pd.no = ?
        ORDER BY hs.no;`;

      const hashTags = await mysql.query(query, [productNo]);

      return hashTags;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductHashTagRepository;
