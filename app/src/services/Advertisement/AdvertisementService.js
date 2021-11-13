const AdvertisementRepository = require("../../repository/Advertisement/AdvertisementRepository");

class AdvertisementService {
  constructor(req) {
    this.body = req.body;
  }

  async saveInquiry() {
    const inquirer = this.body;
    try {
      const insertId = await AdvertisementRepository.saveInquiry(inquirer);
      if (insertId) return { inquiryNo: insertId };
    } catch (err) {
      throw err;
    }
  }
}
module.exports = AdvertisementService;
