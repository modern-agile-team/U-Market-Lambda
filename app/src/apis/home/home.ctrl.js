const logger = require("../../config/logger");

const Product = require("../../models/services/Product/Product");
const ProductStorage = require("../../models/services/Product/ProductStorage");

const home = {
  today: async (req, res) => {
    try {
      const hotProducts = await ProductStorage.findHotsByLimit(10);
      const newProducts = await ProductStorage.findNewsByLimit(12);

      const response = {
        success: true,
        msg: "TODAY 물품 데이터 조회에 성공하셨습니다.",
        hotProducts,
        newProducts,
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  byPrice: async (req, res) => {
    try {
      const product = new Product(req);
      const products = await product.findAllAboutHomeBasedPrice();

      const response = {
        success: true,
        msg: "가격별 물품 데이터 조회에 성공하셨습니다.",
        products,
      };
      logger.info(
        `GET /api/home/by-price/:sort/:startNo/:limit 200 ${response.msg}`,
      );
      return res.status(200).json(response);
    } catch (err) {
      logger.error(
        `GET /api/home/by-price/:sort/:startNo/:limit 500 err: ${err}`,
      );
      return res.status(500).json(err);
    }
  },
};

module.exports = {
  home,
};
