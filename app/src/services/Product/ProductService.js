const ProductRepository = require("../../repository/Product/ProductRepository");

class ProductService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
    this.sql = req.sql;
  }

  async findHotAndNewByLimit() {
    try {
      const hotProducts = await ProductRepository.findHotsByLimit(10);
      const newProducts = await ProductRepository.findNewsByLimit(12);

      if (hotProducts && newProducts)
        return {
          hotProducts,
          newProducts,
        };
      throw new Error("Not Exist Hot And New");
    } catch (err) {
      throw err;
    }
  }

  async findAllAboutHomeBasedPrice() {
    const { startNo, sort, limit } = this.query;
    const attr = { startNo: Number(startNo), sort, limit: Number(limit) };
    const products = await ProductRepository.findAllBasedPriceBy(attr);
    return { products };
  }

  async findAllAboutMarketBasedPrice() {
    const { startNo, startPriceRange, endPriceRange, limit } = this.query;
    const attr = {
      startNo: Number(startNo),
      startPriceRange: Number(startPriceRange),
      endPriceRange: Number(endPriceRange),
      limit: Number(limit),
    };
    const products = await ProductRepository.findAllAboutMarketBasedPriceBy(
      attr,
      this.sql,
    );
    return { products };
  }

  async findAllOfViewed() {
    const { userNo } = this.params;
    const { startNo, limit } = this.query;
    const attr = { startNo: Number(startNo), limit: Number(limit) };
    const products = await ProductRepository.findAllOfViewedByUserNo(
      userNo,
      attr,
    );

    return { products };
  }
}

module.exports = ProductService;
