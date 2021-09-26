const MajorStorage = require("./MajorStorage");

class Major {
  constructor(req) {
    this.body = req.body;
  }
  async createSchoolByname() {
    const user = this.body;
    let region, schoolNum;

    const regionNum = await MajorStorage.findRegionNumByName(user.region);
    if (regionNum) {
      [region, schoolNum] = await MajorStorage.findSchoolNumByName(user.school);
      if (regionNum === region)
        return { success: false, msg: "이미 존재하는 학교입니다." };
      if (!schoolNum) {
        schoolNum = await MajorStorage.createSchoolByName(
          regionNum,
          user.school,
        );
        return { success: true, msg: "학교 생성 완료" };
      }
      return { success: true, msg: "학교 조회 완료" };
    }
  }

  async createMajorByname() {
    const user = this.body;
    let number = {};
    let majorNum, detailMajorNum, departmentNum;

    try {
      departmentNum = await MajorStorage.findDepartmentNumByName(
        user.department,
      );
      if (!departmentNum)
        departmentNum = await MajorStorage.createDepartmentByName(
          user.department,
        );
      if (departmentNum)
        majorNum = await MajorStorage.findMajorNumByName(user.major);
      if (!majorNum)
        majorNum = await MajorStorage.createMajorByName(
          departmentNum,
          user.major,
        );
      detailMajorNum = await MajorStorage.findDetailMajorNumByName(
        user.detailMajor,
      );
      if (!detailMajorNum)
        detailMajorNum = await MajorStorage.createDetailMajorByName(
          majorNum,
          user.detailMajor,
        );
      return { success: true, msg: "계열 생성에 성공했습니다", detail: number };
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    }
  }
}

module.exports = Major;
