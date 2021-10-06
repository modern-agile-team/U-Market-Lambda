const logger = require("../../config/logger");

const ProductService = require("../../services/Product/ProductService");

const products = {
  home: async (req, res) => {
    try {
      req.query = Validator.checkPriceRange(req.query);
      req.sql = Validator.makeSqlAboutWhereStatements(req.query);

      const product = new ProductService(req);
      const products = await product.findAllAboutMarketBasedPrice();

      const response = {
        success: true,
        msg: "가격별 물품 데이터 조회에 성공하셨습니다.",
        products,
      };

      logger.info(`GET /api/products 200 ${response.msg}`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/products 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
};

const Validator = {
  checkPriceRange: query => {
    if (isNaN(query.startPriceRange) || query.startPriceRange < 0) {
      query.startPriceRange = 0;
    }

    if (isNaN(query.endPriceRange) || query.endPriceRange > 999999999) {
      query.endPriceRange = 999999999;
    }
    return query;
  },
  makeSqlAboutWhereStatements: query => {
    let sql = "";
    if (!isNaN(query.regionNo)) {
      sql += `AND region_no = ${query.regionNo} `;
    }

    if (!isNaN(query.schoolNo)) {
      sql += `AND school_no = ${query.schoolNo} `;
    }

    if (!isNaN(query.departmentNo)) {
      sql += `AND department_no = ${query.departmentNo} `;
    }

    if (!isNaN(query.majorNo)) {
      sql += `AND major_no = ${query.majorNo} `;
    }
    return sql;
  },
};

module.exports = {
  products,
};
