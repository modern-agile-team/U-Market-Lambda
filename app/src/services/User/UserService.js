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

      return {
        success: true,
        msg: "회원가입이 정상 처리 되었습니다.",
        id: signup,
      };
    } catch (err) {
      if (err.sqlMessage.includes("email_UNIQUE"))
        throw new Error("Duplicate Email");
      if (err.sqlMessage.includes("nickname_UNIQUE"))
        throw new Error("Duplicate nickname");
      throw err;
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
        throw new Error("wrong password");
      }
      throw new Error("Not Exist email");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
