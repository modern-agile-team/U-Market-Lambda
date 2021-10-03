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
      let response = {};

      const params = req.params;
      if (!["asc", "desc"].includes(params.sort)) {
        response = getError400(
          "GET /api/home/by-price/:sort/:startNo/:limit",
          "잘못된 요청입니다. sort 파라미터는 'asc' 혹은 'desc' 둘 중 하나만 가능합니다.",
        );
        return res.status(400).json(response);
      } else if (isNaN(params.startNo)) {
        response = getError400(
          "GET /api/home/by-price/:sort/:startNo/:limit",
          "잘못된 요청입니다. 'startNo'는 숫자만 가능합니다.",
        );
        return res.status(400).json(response);
      } else if (isNaN(params.limit)) {
        response = getError400(
          "GET /api/home/by-price/:sort/:startNo/:limit",
          "잘못된 요청입니다. 'limit'는 숫자만 가능합니다.",
        );
        return res.status(400).json(response);
      }

      const product = new Product(req);
      const products = await product.findAllAboutHomeBasedPrice();

      response = {
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

const getError400 = (url, errorMsg) => {
  const response = {
    success: false,
    msg: errorMsg,
  };

  logger.error(`${url} 400 ${response.msg}`);
  return response;
};

module.exports = {
  home,
};
