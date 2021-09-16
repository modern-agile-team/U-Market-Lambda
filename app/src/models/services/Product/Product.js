const ProductStorage = require("./ProductStorage");

class Product {
  constructor(req) {
    this.body = req.body;
  }
}

module.exports = Product;
