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
}

module.exports = CommunityImageRepository;
