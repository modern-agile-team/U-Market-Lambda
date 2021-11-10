const mysql = require("../../config/mysql");

class ImageRepository {
  static async uploadImage(user, imageUrl) {
    // product: flag = 1, community: flag = 2 profile = 3
    try {
      await mysql.connect();
      let query;
      if (user.flag === 1)
        query = `INSERT INTO product_images(product_no, url) VALUES (?, ?)`;
      if (user.flag === 2)
        query = `INSERT INTO community_images(community_no, url) VALUES (?, ?)`;
      if (user.flag === 3) {
        query = `UPDATE users SET profile_img_url = ? WHERE (no = ?);`;
        await mysql.query(query, [imageUrl[0], user.no]);
        return true;
      }
      for (let i in imageUrl) {
        await mysql.query(query, [user.no, imageUrl[i]]);
      }
      return true;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  // static async findAllByNo(no) {
  //   try {
  //     await mysql.connect();
  //     let query =
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     mysql?.end();
  //   }
  // }
}

module.exports = ImageRepository;
