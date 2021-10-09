const MajorRepository = require("../../repository/Major/MajorRepository");

class MajorService {
  constructor(req) {
    this.body = req.body;
    this.Create = new Create(this.body);
  }

  async findSchoolNumAndName() {
    try {
      const schools = await MajorRepository.findSchoolNumAndName();

      return { success: true, msg: "학교 조회 성공", schools };
    } catch (err) {
      throw err;
    }
  }

  async findDepartmentNumAndName() {
    try {
      const departments = await MajorRepository.findDepartmentNumAndName();

      return { success: true, msg: "계열 목록 불러오기 성공", departments };
    } catch (err) {
      throw err;
    }
  }

  async createMajorByname() {
    let majorNum, departmentNum;

    try {
      departmentNum = await this.Create.findDepartment();

      majorNum = await this.Create.findOrCreateMajor(departmentNum);
      if (!majorNum) throw new Error("Not Exist Major");
      return { success: true, msg: "전공 조회 성공", majorNum };
    } catch (err) {
      throw err;
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
