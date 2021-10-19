const nodemailer = require("nodemailer");
const UserRepository = require("../../repository/User/UserRepository");
const Cryptor = require("../../utils/Cryptor");

const mailOption = require("../../config/mail");

class EmailService {
  constructor(req) {
    this.body = req.body;
  }

  async sendNewPassword() {
    const user = this.body;
    const temporaryPsword = Math.random().toString(36).substr(2, 11);
    try {
      const userNo = await UserRepository.isExistUserByNameAndEmail(user);
      const { hash, salt } = await Cryptor.encrypt(temporaryPsword);
      user.psword = hash;
      user.salt = salt;

      const message = {
        from: process.env.MAIL_EMAIL,
        to: user.email,
        subject: `[U-Market] ${user.name}님께 임시 비밀번호가 도착했습니다.`,
        html: `<p>안녕하십니까, <b>${user.name}</b>님의 임시비밀번호는 ${temporaryPsword}입니다. <br> 임시 비밀번호를 이용해 로그인하신 후 비밀번호 변경을 부탁드립니다. 😊 <br> `,
      };
      const transporter = nodemailer.createTransport(mailOption);
      transporter.sendMail(message);
      const changePsword = await UserRepository.updatePassword(userNo, user);
      if (changePsword) return { msg: "임시 비밀번호 메일 정상 전송" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EmailService;
