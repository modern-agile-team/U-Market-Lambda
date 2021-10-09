const logger = require("../../config/logger");

const ProductService = require("../../services/Product/ProductService");
const Validator = require("../../utils/Validator");

const products = {
  home: async (req, res) => {
    try {
      req.query = Validator.checkPriceRange(req.query);
      req.sql = Validator.makeSqlAboutWhereStatements(req.query);

      const product = new ProductService(req);
      const response = await product.findAllAboutMarketBasedPrice();

      logger.info(`GET /api/products 200`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/products 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
  detailView: async (req, res) => {
    try {
      const product = new ProductService(req);
      const response = await product.detailView();

      logger.info(`GET /api/products/:productNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/products/:productNo 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.register();

      logger.info(`GET /api/products/:productNo 200`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  products,
};
