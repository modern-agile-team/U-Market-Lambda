const MajorStorage = require("./MajorStorage");

class Major {
  constructor(req) {
    this.body = req.body;
    this.Create = new Create(this.body);
  }
  async createSchoolByname() {
    const user = this.body;
    let region, schoolNum;

    try {
      const regionNum = await MajorStorage.findRegionNumByName(user.region);
      if (regionNum) {
        [region, schoolNum] = await MajorStorage.findSchoolNumByName(
          user.school,
        );
        if (regionNum === region)
          return { success: true, msg: "학교 조회 완료", schoolNum, regionNum };
        if (!schoolNum) {
          schoolNum = await MajorStorage.createSchoolByName(
            regionNum,
            user.school,
          );
        }
        if (schoolNum)
          return { success: true, msg: "학교 조회 완료", schoolNum, regionNum };
        return { success: false, msg: "학교 조회 실패" };
      }
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }

  async createMajorByname() {
    let majorNum, detailMajorNum, departmentNum;

    try {
      departmentNum = await this.Create.findOrCreatedepartment();

      if (departmentNum)
        majorNum = await this.Create.findOrCreateMajor(departmentNum);
      if (majorNum)
        detailMajorNum = await this.Create.findOrCreateDetailMajor(majorNum);
      return detailMajorNum;
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }
}

class Create {
  constructor(body) {
    this.department = body.department;
    this.major = body.major;
    this.detailMajor = body.detailMajor;
  }

  async findOrCreatedepartment() {
    let departmentNum;
    try {
      departmentNum = await MajorStorage.findDepartmentNumByName(
        this.department,
      );
      if (!departmentNum) {
        departmentNum = await MajorStorage.createDepartmentByName(
          this.department,
        );
      }
      return departmentNum;
    } catch (err) {
      throw err;
    }
  }

  async findOrCreateMajor(departmentNum) {
    console.log(departmentNum);
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

  async findOrCreateDetailMajor(majorNum) {
    let detailMajorNum;
    try {
      detailMajorNum = await MajorStorage.findDetailMajorNumByName(
        this.detailMajor,
      );
      if (!detailMajorNum)
        detailMajorNum = await MajorStorage.createDetailMajorByName(
          majorNum,
          this.detailMajor,
        );
      if (detailMajorNum)
        return { success: true, msg: "계열 조회 완료", detailMajorNum };
      return { success: false, msg: "계열 조회 실패" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Major;
