const mysql = require("../../../config/mysql");

class MajorStorage {
  static async findRegionNumByName(region) {
    try {
      const query = `SELECT no FROM regions WHERE name = ?;`;
      await mysql.connect();
      const result = await mysql.query(query, [region]);
      return result[0].no;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findSchoolNumByName(school) {
    try {
      const query = `SELECT no, region_no FROM schools WHERE name = ?;`;
      await mysql.connect();
      const result = await mysql.query(query, [school]);
      if (result.length > 0) return [result[0].region_no, result[0].no];
      return [false, false];
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findDepartmentNumByName(department) {
    try {
      const query = `SELECT no FROM departments WHERE name = ?;`;
      await mysql.connect();
      const result = await mysql.query(query, [department]);
      if (result.length > 0) return result[0].no;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findMajorNumByName(major) {
    try {
      const query = `SELECT no FROM majors WHERE name = ?;`;
      await mysql.connect();
      const result = await mysql.query(query, [major]);
      if (result.length > 0) return result[0].no;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findDetailMajorNumByName(detailMajor) {
    try {
      const query = `SELECT no FROM detail_majors WHERE name = ?;`;
      await mysql.connect();
      const result = await mysql.query(query, [detailMajor]);
      if (result.length > 0) return result[0].no;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async createSchoolByName(regionNum, school) {
    try {
      const query = `INSERT INTO schools(region_no ,name) VALUES(?, ?);`;
      await mysql.connect();
      const result = await mysql.query(query, [regionNum, school]);

      if (result.affectedRows) return result.insertId;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async createDepartmentByName(department) {
    try {
      const query = `INSERT INTO departments(name) VALUES(?);`;
      await mysql.connect();
      const result = await mysql.query(query, [department]);
      if (result.affectedRows) return result.insertId;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async createMajorByName(departmentNum, major) {
    try {
      const query = `INSERT INTO majors(department_no, name) VALUES(?, ?);`;
      await mysql.connect();
      const result = await mysql.query(query, [departmentNum, major]);

      if (result.affectedRows) return result.insertId;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async createDetailMajorByName(majorNum, detailMajor) {
    try {
      const query = `INSERT INTO detail_majors(major_no, name) VALUES(?, ?);`;
      await mysql.connect();
      const result = await mysql.query(query, [majorNum, detailMajor]);
      if (result.affectedRows) return result.insertId;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }
}

module.exports = MajorStorage;
