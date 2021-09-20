const mariadb = require("../../../config/mariadb");

class MajorStorage {
  static async findRegionNumByName(region) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no FROM regions WHERE name = ?;`;

      const result = await conn.query(query, [region]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findSchoolNumByName(school) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no FROM schools WHERE name = ?;`;

      const result = await conn.query(query, [school]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findDepartmentNumByName(department) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no FROM departments WHERE name = ?;`;

      const result = await conn.query(query, [department]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findMajorNumByName(major) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no FROM majors WHERE name = ?;`;

      const result = await conn.query(query, [major]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findDetailMajorNumByName(detailMajor) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no FROM detail_majors WHERE name = ?;`;
      const result = await conn.query(query, [detailMajor]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createSchoolByName(regionNum, school) {
    let conn;
    try {
      conn = await mariadb.getConnection();

      const query = `INSERT INTO schools(region_no ,name) VAULES(?, ?);`;
      const result = await conn.query(query, [regionNum, school]);
      if (result.affectedRows) return result.insertID;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createDepartmentByName(department) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO departments(name) VAULES(?);`;
      const result = await conn.query(query, [department]);
      if (result.affectedRows) return result.insertID;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createMajorByName(departmentNum, major) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO majors(department_no, name) VAULES(?, ?);`;

      const result = await conn.query(query, [departmentNum, major]);

      if (result.affectedRows) return result.insertID;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createDetailMajorByName(majorNum, detailMajor) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO detail_majors(major_no, name) VAULES(?, ?);`;

      const result = await conn.query(query, [majorNum, detailMajor]);

      if (result.affectedRows) return result.insertID;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = MajorStorage;
