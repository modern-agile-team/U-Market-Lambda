const UserStorage = require("./UserStorage");
const Cryptor = require("../../utils/Cryptor");

class User {
  constructor(req) {
    this.body = req.body;
  }

  async signup() {
    const user = this.body;
    try {
      const { hash, salt } = await Cryptor.encrypt(user.psword);
      user.psword = hash;
      user.salt = salt;
      const signup = await UserStorage.signup(user);
      if (signup)
        return { success: true, msg: "회원가입이 정상 처리 되었습니다." };
      return { success: false, msg: "회원가입 실패, 개발자에게 문의해주세요" };
    } catch (err) {
      if (err.sqlMessage.includes("email_UNIQUE"))
        return { success: false, msg: "이메일이 중복되었습니다." };
      if (err.sqlMessage.includes("nickname_UNIQUE"))
        return { success: false, msg: "닉네임이 중복되었습니다." };
      return { success: false, msg: err };
    }
  }
}

module.exports = User;
