const logger = require("../../config/logger");

const ProductService = require("../../services/Product/ProductService");
const Validator = require("../../utils/Validator");

const products = {
  home: async (req, res, next) => {
    try {
      req.query = Validator.checkPriceRange(req.query);
      req.sql = Validator.makeSqlAboutWhereStatements(req.query);

      const product = new ProductService(req);
      const response = await product.findAllAboutMarketBasedPrice();

      logger.info(`GET /api/products 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAllByDetailCategory: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.findAllByDetailCategory();

      logger.info(`GET /api/products/category?detail=${req.query.detail} 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAllByCategory: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.findAllByCategory();

      logger.info(`GET /api/products/category/${req.params.categoryNo} 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  detailView: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.detailView();

      logger.info(`GET /api/products/:productNo/:userNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.register();

      logger.info(`POST /api/products/:productNo 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateView: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.updateView();

      logger.info(`PUT /api/products/:productNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateHit: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.updateHitByProductNo();

      logger.info(`PATCH /api/products/:productNo 200`);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const response = await product.updateStatus();

      logger.info(`PATCH /api/products/:productNo/status 201`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const product = new ProductService(req);
      const isDelete = await product.delete();

      logger.info(`DELETE /api/products/:productNo 204`);
      return res.status(201).json(isDelete);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  products,
};
