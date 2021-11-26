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

  static async findSchoolNumAndNameByRegionNo(regionNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT no AS value, name AS item FROM schools 
        WHERE region_no = ? 
        ORDER BY no`;

      const result = await mysql.query(query, [regionNo]);
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

  static async findMajorNumAndNameByDepartmentNo(departmentNo) {
    try {
      await mysql.connect();
      const query = `
        SELECT no AS value, name AS item 
        FROM majors 
        WHERE department_no = ?
        ORDER BY no`;

      const result = await mysql.query(query, [departmentNo]);
      if (result.length > 0) return result;
      throw new Error("Not Exist Major");
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
      const results = await mysql.query(query, [major]);

      if (results[0].no) return results[0].no;
      return false;
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findNamesOfRegionAndSchoolBySchoolNo(schoolNo) {
    try {
      const query = `
        SELECT rg.name AS regionName, sh.name AS schoolName
        FROM regions AS rg
        JOIN schools AS sh
        ON rg.no = sh.region_no
        WHERE sh.no = ?;`;

      await mysql.connect();
      const results = await mysql.query(query, [schoolNo]);

      if (results[0]?.regionName) return results[0];
      throw Error("There is no the datas of name regarding region and school.");
    } catch (err) {
      throw err;
    } finally {
      await mysql?.end();
    }
  }

  static async findNamesOfDepartmentAndMajorByMajorNo(majorNo) {
    try {
      const query = `
        SELECT dp.name AS departmentName, mj.name AS majorName
        FROM departments AS dp
        JOIN majors AS mj
        ON dp.no = mj.department_no
        WHERE mj.no = ?;`;

      await mysql.connect();
      const results = await mysql.query(query, [majorNo]);
      if (results[0]?.departmentName) return results[0];
      throw Error(
        "There is no the datas of name regarding department and major.",
      );
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
