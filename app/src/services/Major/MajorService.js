const MajorRepository = require("../../repository/Major/MajorRepository");

class MajorService {
  constructor(req) {
    this.body = req.body;
    this.Create = new Create(this.body);
  }

  async findSchoolNumAndName() {
    try {
      const result = await MajorRepository.findSchoolNumAndName();

      return { success: true, msg: "학교 조회 성공", result };
    } catch (err) {
      // return { success: false, msg: err.sqlMessage };
      throw err;
    }
  }

  async findDepartmentNumAndName() {
    try {
      const result = await MajorRepository.findDepartmentNumAndName();

      return { success: true, msg: "계열 목록 불러오기 성공", result };
    } catch (err) {
      // return { success: false, msg: err.sqlMessage };
      throw err;
    }
  }

  async createMajorByname() {
    let majorNum, departmentNum;

    try {
      departmentNum = await this.Create.findDepartment();

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
      departmentNum = await MajorRepository.findDepartmentNumByName(
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
      majorNum = await MajorRepository.findMajorNumByName(this.major);
      if (!majorNum)
        majorNum = await MajorRepository.createMajorByName(
          departmentNum,
          this.major,
        );
      return majorNum;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MajorService;
