const ProductStorage = require("./ProductStorage");

class Product {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findAllAboutHomeBasedPrice() {
    const attr = this.params;
    const products = await ProductStorage.findAllBasedPriceBy(attr);
    return products;
  }
}

module.exports = Product;
