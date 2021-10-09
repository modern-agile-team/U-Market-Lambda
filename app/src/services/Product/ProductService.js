const Validator = require("../../utils/Validator");
const HashTagService = require("../HashTag/HashTagService");
const HashTagRepository = require("../../repository/HashTag/HashTagRepository");
const ProductRepository = require("../../repository/Product/ProductRepository");
const ProductImageRepository = require("../../repository/Product/ProductImageRepository");
const ProductHashTagRepository = require("../../repository/Product/ProductHashTagRepository");

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

  async detailView() {
    // 물건의 상세 데이터 불러오기
    const product = await ProductRepository.findOneByNo(this.params.productNo);
    product.writer = {
      nickname: product.nickname,
      profileImage: product.profileImage,
    };
    product.tradingMethods = {
      isDirect: Boolean(product.isDirect),
      isDelivery: Boolean(product.isDelivery),
    };
    product.isBargaining = Boolean(product.isBargaining);

    delete product.nickname;
    delete product.profileImage;
    delete product.isDirect;
    delete product.isDelivery;

    // 물건 상세화면의 해쉬태그 목록 불러오기
    product.hashTags = await ProductHashTagRepository.findAllByProductNo(
      this.params.productNo,
    );
    product.hashTags = product.hashTags.map(hashTag => hashTag.name);

    this.sql = Validator.makeHashSqlAboutWhereStatements(product.hashTags);

    // 물건의 이미지 데이터 모두 불러오기
    product.images = await ProductImageRepository.findAllByProductNo(
      this.params.productNo,
    );
    product.images = product.images.map(img => img.url);

    // 물건의 관련 물품 데이터 모두 불러오기
    const relatedProducts = await ProductRepository.findAllRelatedByNo(
      this.sql,
    );

    return { product, relatedProducts };
  }

  async register() {
    // 이슈: images 혹은 hashTag, productHashTag 중 하나라도 저장 실패시 기존에 수행된 트랜잭션이 복구 되어야한다. -> 삽입된 데이터 다시 삭제되도록 구현해야함. 어떻게..?
    const { product } = this.body;
    try {
      const productNo = await ProductRepository.insertOne(product);
      product.images.forEach(async imageUrl => {
        await ProductImageRepository.insertOne(productNo, imageUrl);
      });

      const hashTagService = new HashTagService();
      const hashTagNos = await hashTagService.findAllOnlyNoByName(
        product.hashTags,
      );
      hashTagNos.forEach(async hashTagNo => {
        await ProductHashTagRepository.insertOne(productNo, hashTagNo);
      });

      return { productNo };
    } catch (err) {
      if (err.errno === 1452) throw new Error("Not Exist Referenced Row");
      throw err;
    }
  }
}

module.exports = ProductService;
