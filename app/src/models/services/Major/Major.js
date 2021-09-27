const MajorStorage = require("./MajorStorage");

class Major {
  constructor(req) {
    this.body = req.body;
    this.Create = new Create(this.body);
  }

  async findSchoolNumAndName() {
    try {
      const result = await MajorStorage.findSchoolNumAndName();
      if (result) return result;
      return false;
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async findDepartmentNumAndName() {
    try {
      const result = await MajorStorage.findDepartmentNumAndName();
      if (result) return result;
      return false;
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async findSchoolByname() {
    const user = this.body;
    let region, schoolNum;
    // regions 없어도 되게 만들어도 됌
    try {
      const regionNum = await MajorStorage.findRegionNumByName(user.region);
      if (regionNum) {
        [region, schoolNum] = await MajorStorage.findSchoolNumByName(
          user.school,
        );
        if (regionNum === region) return schoolNum, regionNum;
        return { success: false, msg: "학교 조회 실패" };
      }
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async createMajorByname() {
    let majorNum, departmentNum;

    try {
      departmentNum = await this.Create.findDepartment();

      if (departmentNum)
        majorNum = await this.Create.findOrCreateDetailMajor(departmentNum);
      if (!majorNum) return { success: false, msg: "전공 조회 실패" };
      return majorNum;
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }
}

class Create {
  constructor(body) {
    this.department = body.department;
    this.major = body.major;
  }

  async findDepartment() {
    let departmentNum;
    try {
      departmentNum = await MajorStorage.findDepartmentNumByName(
        this.department,
      );

      return departmentNum;
    } catch (err) {
      throw err;
    }
  }

  async findOrCreateMajor(departmentNum) {
    let majorNum;
    try {
      majorNum = await MajorStorage.findMajorNumByName(this.major);
      if (!majorNum)
        majorNum = await MajorStorage.createMajorByName(
          departmentNum,
          this.major,
        );
      return majorNum;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Major;
