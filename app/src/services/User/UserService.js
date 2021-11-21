const UserRepostory = require("../../repository/User/UserRepository");
const Cryptor = require("../../utils/Cryptor");
const AuthService = require("../Auth/AuthService");

class UserService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
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
            msg: `${whoWantsLogin.nickname}님이 로그인을 성공했습니다.`,
            jwt,
            email,
            userNo: whoWantsLogin.userNo,
            regionNo: whoWantsLogin.regionNo,
            schoolNo: whoWantsLogin.schoolNo,
            majorNo: whoWantsLogin.majorNo,
            departmentNo: whoWantsLogin.departmentNo,
          };
        }
        throw new Error("wrong password");
      }
      throw new Error("Not Exist email");
    } catch (err) {
      throw err;
    }
  }

  async profile() {
    const userNo = this.params.userNo;

    try {
      const result = await UserRepostory.findAllByNo(userNo);

      return { profile: result };
    } catch (err) {
      throw err;
    }
  }

  async update() {
    const userNo = this.params.userNo;
    const updateData = this.body;
    try {
      const result = await UserRepostory.update(userNo, updateData);
      if (!result) return { msg: "원래 닉네임과 똑같습니다." };
      return { msg: "정보 변경 완료" };
    } catch (err) {
      if (err.errno === 1062) throw new Error("Duplicate nickname");
      throw err;
    }
  }

  async changePassword() {
    const user = this.body;

    try {
      const isExistUser = await UserRepostory.isExistUserByNoAndPsword(user);
      const password = await Cryptor.encryptBySalt(
        user.currentPassword,
        isExistUser.salt || "",
      );
      if (password !== isExistUser.psword) throw new Error("Wrong Password");
      const { hash, salt } = await Cryptor.encrypt(user.changePassword);
      user.psword = hash;
      user.salt = salt;
      await UserRepostory.updatePassword(isExistUser.no, user);
      return { msg: "비밀번호가 변경되었습니다." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
