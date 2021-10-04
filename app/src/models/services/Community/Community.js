const CommunityStorage = require("./CommunityStorage");

class Community {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
    this.sql = req.sql;
  }

  async findAllAboutHomeBasedPrice() {
    const { startNo, sort, limit } = this.query;
    const attr = { startNo: Number(startNo), sort, limit: Number(limit) };
    const products = await CommunityStorage.findAllBasedPriceBy(attr);
    return products;
  }

  async findAllAboutMarketBasedPrice() {
    const { startNo, startPriceRange, endPriceRange, limit } = this.query;
    const attr = {
      startNo: Number(startNo),
      startPriceRange: Number(startPriceRange),
      endPriceRange: Number(endPriceRange),
      limit: Number(limit),
    };
    const products = await CommunityStorage.findAllAboutMarketBasedPriceBy(
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
