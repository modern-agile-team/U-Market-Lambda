const MajorStorage = require("./MajorStorage");

class Major {
  constructor(req) {
    this.body = req.body;
    this.Create = new Create(this.body);
  }

  async findSchoolNumAndName() {
    try {
      const result = await MajorStorage.findSchoolNumAndName();
      if (result.length !== 0)
        return { success: true, msg: "학교 조회 성공", result };
      return {
        success: false,
        msg: "학교 목록 불러오기 실패했습니다. 문의주세요",
      };
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async findDepartmentNumAndName() {
    try {
      const result = await MajorStorage.findDepartmentNumAndName();
      if (result.length !== 0)
        return { success: true, msg: "계열 목록 불러오기 성공", result };
      return {
        success: false,
        msg: "계열 목록 불러오기 실패했습니다. 문의주세요",
      };
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async createMajorByname() {
    let majorNum, departmentNum;

    try {
      departmentNum = await this.Create.findDepartment();

      if (departmentNum)
        majorNum = await this.Create.findOrCreateMajor(departmentNum);
      if (!majorNum) return { success: false, msg: "전공 조회 실패" };
      return { success: true, msg: "전공 조회 성공", majorNum };
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
      // err.sqlMessage
      return { success: false, msg: `계열 조회 실패했습니다 문의주세요` };
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
      return { success: false, msg: `계열 조회 실패했습니다 문의주세요` };
    }
  }
}

module.exports = Major;
