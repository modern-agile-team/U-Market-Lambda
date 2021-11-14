const AdvertisementRepository = require("../../repository/Advertisement/AdvertisementRepository");

class AdvertisementService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
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

  async deleteInquiry() {
    const { inquiryNo } = this.params;
    try {
      const isDelete = await AdvertisementRepository.deleteInquiry(inquiryNo);
      if (isDelete) return true;
    } catch (err) {
      throw err;
    }
  }

  async updateInquiry() {
    const inquiry = this.body;
    const { inquiryNo } = this.params;
    try {
      const isUpdate = await AdvertisementRepository.updateInquiry(
        inquiry,
        inquiryNo,
      );
      if (isUpdate) return { inquiryNo };
    } catch (err) {
      throw err;
    }
  }

  async findAdvertisementByInquirer() {
    const { userNo } = this.params;
    try {
      const inquiries =
        await AdvertisementRepository.findAdvertisementByInquirer(userNo);
      return { inquiries };
    } catch (err) {
      throw err;
    }
  }
}
module.exports = AdvertisementService;
