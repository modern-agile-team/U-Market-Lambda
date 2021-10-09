const mysql = require("../../config/mysql");

class MajorRepository {
  static async findRegionNumByName(region) {
    try {
      const query = `SELECT no FROM regions WHERE name = ?;`;
      await mysql.connect();
      const [{ no }] = await mysql.query(query, [region]);
      return no;
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
      throw new Error("Not Exist School By region");
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findSchoolNumAndName() {
    try {
      const query = `SELECT no AS value, name AS item FROM schools ORDER BY no`;
      await mysql.connect();
      const result = await mysql.query(query);
      if (result.length > 0) return result;
      throw new Error("Not Exist School");
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findDepartmentNumAndName() {
    try {
      const query = `SELECT no AS value, name AS item FROM departments ORDER BY no`;
      await mysql.connect();
      const result = await mysql.query(query);
      if (result.length > 0) return result;
      throw new Error("Not Exist Department");
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
      const [{ no }] = await mysql.query(query, [department]);
      if (no) return no;
      throw new Error("Not Exist Department");
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
      if (result.no) return result.no;
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
}

module.exports = MajorRepository;
