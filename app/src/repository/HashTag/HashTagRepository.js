const mysql = require("../../config/mysql");

class HashTagRepository {
  static async insertOne(hashTagName) {
    try {
      await mysql.connect();
      const query = `
      INSERT INTO hash_tags (name) VALUES (?);`;

      const result = await mysql.query(query, [hashTagName]);

      return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findOneByName(hashTagName) {
    try {
      await mysql.connect();
      const query = `
      SELECT no FROM hash_tags WHERE name = ?;`;

      const hashTags = await mysql.query(query, [hashTagName]);

      return hashTags[0]?.no;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = HashTagRepository;
