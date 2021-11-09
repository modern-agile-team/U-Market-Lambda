const MajorRepository = require("../../repository/Major/MajorRepository");

class MajorService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.Create = new Create(this.body);
  }

  async findSchoolNumAndName() {
    try {
      const { regionNo } = this.params;
      const schools = await MajorRepository.findSchoolNumAndNameByRegionNo(
        regionNo,
      );

      return { schools };
    } catch (err) {
      throw err;
    }
  }

  async findDepartmentNumAndName() {
    try {
      const departments = await MajorRepository.findDepartmentNumAndName();

      return { departments };
    } catch (err) {
      throw err;
    }
  }

  async findMajorNumAndName() {
    try {
      const { departmentNo } = this.params;
      const majors = await MajorRepository.findMajorNumAndNameByDepartmentNo(
        departmentNo,
      );

      return { majors };
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
      return { majorNum };
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
