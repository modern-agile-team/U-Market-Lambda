const mysql = require("../../config/mysql");

class ProductImageRepository {
  static async findAllByProductNo(productNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT url FROM product_images
        WHERE product_no = 12;`;

      const images = await mysql.query(query, [productNo]);

      return images;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertOne(productNo, imageUrl) {
    try {
      await mysql.connect();
      const query = `
      INSERT INTO product_images (product_no, url) VALUES (?, ?);`;

      const images = await mysql.query(query, [productNo, imageUrl]);

      return images;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = ProductImageRepository;
