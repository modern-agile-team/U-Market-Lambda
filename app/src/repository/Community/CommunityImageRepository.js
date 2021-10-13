const mysql = require("../../config/mysql");

class CommunityImageRepository {
  static async findAllByCommunityNo(communityNo) {
    try {
      await mysql.connect();
      const query = `
      SELECT url FROM community_images
      WHERE community_no = ?;`;

      const images = await mysql.query(query, [communityNo]);

      return images;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async insertOne(communityNo, imageUrl) {
    try {
      await mysql.connect();
      const query = `
      INSERT INTO community_images (community_no, url) VALUES (?, ?);`;

      const result = await mysql.query(query, [communityNo, imageUrl]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = CommunityImageRepository;
