const UserRepostory = require("../../repository/User/UserRepository");
const Cryptor = require("../../utils/Cryptor");
const AuthService = require("../Auth/AuthService");

class UserService {
  constructor(req) {
    this.body = req.body;
  }

  async signup() {
    const user = this.body;
    try {
      const { hash, salt } = await Cryptor.encrypt(user.psword);
      user.psword = hash;
      user.salt = salt;
      const signup = await UserRepostory.signup(user);
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

  async login() {
    const user = this.body;
    try {
      const whoWantsLogin = await UserRepostory.findAllByEmail(user);

      if (whoWantsLogin) {
        user.psword = await Cryptor.encryptBySalt(
          user.psword,
          whoWantsLogin.salt || "",
        );
        if (user.psword === whoWantsLogin.psword) {
          const jwt = await AuthService.createJWT(user);
          const email = user.email;
          return {
            success: true,
            msg: `${whoWantsLogin.nickname}님이 로그인을 성공했습니다.`,
            jwt,
            email,
          };
        }
        return { success: false, msg: "비밀번호가 틀립니다." };
      }
      return { success: false, msg: "이메일이 존재하지 않습니다." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = UserService;
