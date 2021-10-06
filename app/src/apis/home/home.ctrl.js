const logger = require("../../config/logger");

const ProductService = require("../../services/Product/ProductService");

const home = {
  today: async (req, res, next) => {
    try {
      const productService = new ProductService(req);
      const response = await productService.findHotAndNewByLimit();

      logger.info("GET /api/home/today");
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  byPrice: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.findAllAboutHomeBasedPrice();

      logger.info(
        `GET /api/home/by-price/:sort/:startNo/:limit 200 ${response.msg}`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  viewedProducts: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.findAllOfViewed();

      logger.info(
        `GET /api/home/users/:userNo/viewed-products 200 ${response.msg}`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  home,
};
