// const Validator = require("../../utils/Validator");
// const HashTagService = require("../HashTag/HashTagService");
// const HashTagRepository = require("../../repository/HashTag/HashTagRepository");
const ProductRepository = require("../../repository/Product/ProductRepository");
const ProductImageRepository = require("../../repository/Product/ProductImageRepository");
const WatchlistRepository = require("../../repository/Watchlist/WatchlistRepository");
// const ProductHashTagRepository = require("../../repository/Product/ProductHashTagRepository");

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

  async findAllByDetailCategory() {
    const { detail } = this.query;
    try {
      const products = await ProductRepository.findAllByDetailCategory(detail);

      return { products };
    } catch (err) {
      throw err;
    }
  }

  async findAllByCategory() {
    const { categoryNo } = this.params;
    try {
      const products = await ProductRepository.findAllByCategory(categoryNo);

      return { products };
    } catch (err) {
      throw err;
    }
  }

  async detailView() {
    // 물건의 상세 데이터 불러오기
    const product = await ProductRepository.findOneByNo(this.params.productNo);
    product.tradingMethods = {
      isDirect: Boolean(product.isDirect),
      isDelivery: Boolean(product.isDelivery),
    };
    product.isBargaining = Boolean(product.isBargaining);

    delete product.isDirect;
    delete product.isDelivery;

    // 물건의 이미지 데이터 모두 불러오기
    product.images = await ProductImageRepository.findAllByProductNo(
      this.params.productNo,
    );
    product.images = product.images.map(img => img.url);

    // 물건의 관련 물품 데이터 모두 불러오기
    const relatedProducts = await ProductRepository.findAllRelatedByNo(
      product.detailCategoryNo,
      this.params.productNo,
    );

    const watchFlag = await WatchlistRepository.isExistWatchlist(
      this.params.userNo,
      this.params.productNo,
    );

    product.watchlistFlag = 1;
    if (!watchFlag.length) product.watchlistFlag = 0;

    return { product, relatedProducts };
  }

  async register() {
    // 이슈: images 저장 실패시 기존에 수행된 트랜잭션이 복구 되어야한다. -> 삽입된 데이터 다시 삭제되도록 구현해야함. 어떻게..?
    const { product } = this.body;
    try {
      const productNo = await ProductRepository.insertOne(product);

      return { productNo };
    } catch (err) {
      if (err.errno === 1452) throw new Error("Not Exist Referenced Row");
      throw err;
    }
  }

  async updateView() {
    const { productNo } = this.params;
    const { product } = this.body;
    try {
      product.no = productNo;
      product.tradingMethods.isDirect = Number(product.tradingMethods.isDirect);
      product.tradingMethods.isDelivery = Number(
        product.tradingMethods.isDelivery,
      );
      const isUpdateProduct = await ProductRepository.updateOneByNo(product);

      if (isUpdateProduct) return { productNo };
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    }
  }

  async updateHitByProductNo() {
    const { productNo } = this.params;
    try {
      const result = await ProductRepository.updateHitByProductNo(productNo);

      if (result) return { msg: "조회수가 증가했습니다." };
    } catch (err) {
      throw err;
    }
  }

  async updateStatus() {
    const { productNo } = this.params;
    const { status } = this.body;
    try {
      const result = await ProductRepository.updateStatus(productNo, status);

      if (result) return { msg: "거래 상태 변환 완료." };
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    const { productNo } = this.params;
    try {
      const isDeleteProduct = await ProductRepository.deleteOneByNo(productNo);

      if (isDeleteProduct) return { msg: "삭제 완료되었습니다." };
      throw new Error("Not Exist Product");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
