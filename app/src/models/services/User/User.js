const UserStorage = require("./UserStorage");
const MajorStorage = require("../Major/MajorStorage");
const Cryptor = require("../../utils/Cryptor");

class User {
  constructor(req) {
    this.body = req.body;
  }

  async signup() {
    const user = this.body;
    try {
      const number = this.findNumByRequest(user);

      const { hash, salt } = await Cryptor.encrypt(user.psword);
      user.psword = hash;
      user.salt = salt;

      const signup = await UserStorage.signup(user, number);
      if (signup)
        return { success: true, msg: "회원가입이 정상 처리 되었습니다." };
      return { success: false, msg: "회원가입 실패, 개발자에게 문의해주세요" };
    } catch (err) {
      // if (err.sqlMessage.includes("email"))
      //   return { success: false, msg: "이메일이 중복되었습니다." };
      // if (err.sqlMessage.includes("nickname"))
      //   return { success: false, msg: "닉네임이 중복되었습니다." };
      return { success: false, msg: err };
    }
  }

  async findNumByRequest(user) {
    let number = {};
    let schoolNum, majorNum, detailMajorNum, departmentNum;
    const regionNum = await MajorStorage.findRegionNumByName(user.region);
    if (regionNum) {
      schoolNum = await MajorStorage.findSchoolNumByName(user.school);
      // if (!schoolNum)
      //   schoolNum = await MajorStorage.createSchoolByName(
      //     regionNum,
      //     user.school,
      //   );
    }
    departmentNum = await MajorStorage.findDepartmentNumByName(user.department);
    // if (!departmentNum)
    //   departmentNum = await MajorStorage.createDepartmentByName(
    //     user.department,
    //   );
    if (departmentNum)
      majorNum = await MajorStorage.findMajorNumByName(user.major);
    // if (!majorNum)
    //   majorNum = await MajorStorage.createMajorByName(
    //     departmentNum,
    //     user.major,
    //   );
    detailMajorNum = await MajorStorage.findDetailMajorNumByName(
      user.detailMajor,
    );
    // if (!detailMajorNum)
    //   detailMajorNum = await MajorStorage.createDetailMajorByName(
    //     majorNum,
    //     user.detailMajor,
    //   );
    number.school = schoolNum;
    number.deparment = departmentNum;
    number.major = majorNum;
    number.detailMajor = detailMajorNum;

    return number;
  }
}

module.exports = User;
