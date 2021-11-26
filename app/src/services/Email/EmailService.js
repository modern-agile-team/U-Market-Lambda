const nodemailer = require("nodemailer");
const UserRepository = require("../../repository/User/UserRepository");
const Cryptor = require("../../utils/Cryptor");

const mailOption = require("../../config/mail");
const MajorRepository = require("../../repository/Major/MajorRepository");

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
        html: `안녕하십니까, <b>${user.name}</b>님의 임시비밀번호는 ${temporaryPsword}입니다. <br> 임시 비밀번호를 이용해 로그인하신 후 비밀번호 변경을 부탁드립니다. 😊 <br> `,
      };
      const transporter = nodemailer.createTransport(mailOption);
      transporter.sendMail(message);
      const changePsword = await UserRepository.updatePassword(userNo, user);
      if (changePsword) return { msg: "임시 비밀번호 메일 정상 전송" };
    } catch (err) {
      throw err;
    }
  }

  async sendNewUserToAdmin() {
    const user = this.body;
    try {
      const { regionName, schoolName } =
        await MajorRepository.findNamesOfRegionAndSchoolBySchoolNo(
          user.schoolNum,
        );
      const { departmentName, majorName } =
        await MajorRepository.findNamesOfDepartmentAndMajorByMajorNo(
          user.majorNum,
        );

      const message = {
        from: process.env.MAIL_EMAIL,
        to: process.env.MAIL_EMAIL,
        subject: `[U-Market] ${user.name}님이 회원가입을 요청했습니다.`,
        html: `
          <b>이름 : </b>${user.name} <br>
          <b>이메일 : </b>${user.email} <br>
          <b>닉네임 : </b>${user.nickname} <br>
          <b>지역 : </b>${regionName} <br>
          <b>학교 : </b>${schoolName} <br>
          <b>학부 : </b>${departmentName} <br>
          <b>전공 : </b>${majorName} <br>
          <button>회원 인증 완료</button>
          `,
      };

      const transporter = nodemailer.createTransport(mailOption);
      const { response } = await transporter.sendMail(message);

      if (response[0] === "2")
        return { msg: "관리자에게 회원인증을 요청하셨습니다." };
      throw Error("Failed to send the email to administrator");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EmailService;
