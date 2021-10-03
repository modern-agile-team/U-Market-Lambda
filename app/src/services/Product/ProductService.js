const ProductRepository = require("../../repository/Product/ProductRepository");

class ProductService {
  constructor(req) {
    this.body = req.body;
  }
}

module.exports = ProductService;
