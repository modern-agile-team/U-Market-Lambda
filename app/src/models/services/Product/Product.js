const ProductStorage = require("./ProductStorage");

class Product {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findAllAboutHomeBasedPrice() {
    const { startNo, sort, limit } = this.query;
    const attr = { startNo: Number(startNo), sort, limit: Number(limit) };
    const products = await ProductStorage.findAllBasedPriceBy(attr);
    return products;
  }

  async findAllOfViewed() {
    const { userNo } = this.params;
    const { startNo, limit } = this.query;
    const attr = { startNo: Number(startNo), limit: Number(limit) };
    const products = await ProductStorage.findAllOfViewedByUserNo(userNo, attr);
    return products;
  }
}

module.exports = Product;