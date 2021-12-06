const NotificationRepository = require("../../repository/Notification/NotificationRepository");

class NotificationService {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async create() {
    const userNo = this.params.userNo;
    const info = this.body;
    try {
      await NotificationRepository.create(userNo, info);

      return { msg: "알림 저장 완료" };
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserNo() {
    const userNo = this.params.userNo;
    try {
      const notiList = await NotificationRepository.findAllByUserNo(userNo);

      return { notiList };
    } catch (err) {
      throw err;
    }
  }

  async createToken() {
    const userNo = this.params.userNo;
    const token = this.body.token;
    try {
      await NotificationRepository.createToken(userNo, token);

      return { msg: "token 저장 완료" };
    } catch (err) {
      if (err.errno === 1062) {
        await NotificationRepository.delete(token);
        await NotificationRepository.createToken(userNo, token);

        return { msg: "다른 사람 token 삭제 후 저장 완료" };
      }
      throw err;
    }
  }

  async findTokenByUserNo() {
    const userNo = this.params.userNo;
    try {
      const token = await NotificationRepository.findTokenByUserNo(userNo);

      return token;
    } catch (err) {
      throw err;
    }
  }

  async update() {
    const userNo = this.params.userNo;
    const token = this.body.token;
    try {
      await NotificationRepository.update(userNo, token);
      return { msg: "토큰 변경 완료" };
    } catch (err) {
      if (err.errno === 1062) {
        await NotificationRepository.delete(token);
        await NotificationRepository.update(userNo, token);

        return { msg: "다른 사람 token 삭제 후 저장 완료" };
      }
      throw err;
    }
  }

  async delete() {
    const token = this.body.token;
    try {
      await NotificationRepository.delete(token);

      return { msg: "토근 삭제 되었습니다." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NotificationService;
