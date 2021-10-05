const ProductRepository = require("../../repository/Product/ProductRepository");

class ProductService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findHotAndNewByLimit() {
    try {
      const hotProducts = await ProductRepository.findHotsByLimit(10);
      const newProducts = await ProductRepository.findNewsByLimit(12);
      if (hotProducts && newProducts)
        return {
          msg: "TODAY 물품 데이터 조회에 성공하셨습니다.",
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
    try {
      const attr = { startNo: Number(startNo), sort, limit: Number(limit) };
      const products = await ProductRepository.findAllBasedPriceBy(attr);

      return {
        success: true,
        msg: "가격별 물품 데이터 조회에 성공하셨습니다.",
        products,
      };
    } catch (err) {
      throw err;
    }
  }

  async findAllOfViewed() {
    const { userNo } = this.params;
    const { startNo, limit } = this.query;
    try {
      const attr = { startNo: Number(startNo), limit: Number(limit) };
      const products = await ProductRepository.findAllOfViewedByUserNo(
        userNo,
        attr,
      );
      return {
        success: true,
        msg: "내가 본 물품 데이터 조회에 성공하셨습니다.",
        products,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
