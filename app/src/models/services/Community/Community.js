const CommunityStorage = require("./CommunityStorage");

class Community {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
    this.sql = req.sql;
  }

  async findAllAboutCategory() {
    const { categoryNo } = this.params;
    const { startNo, limit } = this.query;
    const attr = {
      startNo: Number(startNo),
      limit: Number(limit),
      categoryNo: Number(categoryNo),
    };
    const products = await CommunityStorage.findAllAboutCategoryBy(
      attr,
      this.sql,
    );
    return products;
  }

  async findAllOfViewed() {
    const { userNo } = this.params;
    const { startNo, limit } = this.query;
    const attr = { startNo: Number(startNo), limit: Number(limit) };
    const products = await CommunityStorage.findAllOfViewedByUserNo(
      userNo,
      attr,
    );
    return products;
  }
}

module.exports = Community;
