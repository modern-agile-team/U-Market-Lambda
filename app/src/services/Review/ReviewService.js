const ReviewRepository = require("../../repository/Review/ReviewRepository");
const ChatRepository = require("../../repository/Chat/ChatRepository");
const UserRepository = require("../../repository/User/UserRepository");
const ProductRepository = require("../../repository/Product/ProductRepository");

class ReviewService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.query = req.query;
  }
  async findBuyerByUserNo() {
    const userNo = this.params.userNo;
    const productNo = this.query.product;

    try {
      const buyerList = await ChatRepository.findOneProductBuyerBySellerNo(
        userNo,
        productNo,
      );
      return { buyerList };
    } catch (err) {
      throw err;
    }
  }

  async findAllByWriter() {
    const userNo = this.params.userNo;
    try {
      const findWriteByBuyer = await ReviewRepository.findWriteByBuyerNo(
        userNo,
      );
      const findWriteBySeller = await ReviewRepository.findWriteBySellerNo(
        userNo,
      );
      const writedReviews = [...findWriteByBuyer, ...findWriteBySeller];
      return { writedReviews };
    } catch (err) {
      throw err;
    }
  }

  async findAllByReceiver() {
    const userNo = this.params.userNo;
    try {
      const findReceivedReviewByBuyerNo =
        await ReviewRepository.findReceivedReviewByBuyerNo(userNo);
      const findReceivedReviewBySellerNo =
        await ReviewRepository.findReceivedReviewBySellerNo(userNo);
      const receivedReviews = [
        ...findReceivedReviewByBuyerNo,
        ...findReceivedReviewBySellerNo,
      ];
      return { receivedReviews };
    } catch (err) {
      throw err;
    }
  }

  async findNotReviewBySeller() {
    const userNo = this.params.userNo;
    try {
      const products = await ProductRepository.findTradeFinishByUserNo(userNo);
      const reviews = await ReviewRepository.findWriteBySellerNo(userNo);

      const productList = products.filter(
        product =>
          !reviews
            .map(reviews => {
              return reviews.productNo;
            })
            .includes(product.no),
      );

      return { productList };
    } catch (err) {
      throw err;
    }
  }

  async findNotReviewByBuyer() {
    const userNo = this.params.userNo;
    try {
      const products = await ProductRepository.findTradeBySeller(userNo);
      const reviews = await ReviewRepository.findWriteByBuyerNo(userNo);

      const productList = products.filter(
        product =>
          !reviews
            .map(reviews => {
              return reviews.productNo;
            })
            .includes(product.no),
      );

      return { productList };
    } catch (err) {
      throw err;
    }
  }

  async createReview() {
    const information = this.body;

    try {
      const review = await ReviewRepository.createReview(information);
      if (review) return { msg: "리뷰 작성 완료" };
    } catch (err) {
      throw err;
    }
  }

  async createBuyer() {
    const userNo = this.params.userNo;
    const productNo = this.body.productNo;

    try {
      const review = await ReviewRepository.createBuyer(userNo, productNo);
      if (review) return { msg: "구매자 저장 완료" };
    } catch (err) {
      throw err;
    }
  }

  async updateTrustScore() {
    const information = this.body;
    const userNo = this.params.userNo;

    try {
      let { trustScore, tradeCount } = await UserRepository.findAllByNo(userNo);
      trustScore =
        (trustScore * (tradeCount - 1) + information.trustScore) / tradeCount;
      const result = await ReviewRepository.updateTrustScore(
        trustScore,
        userNo,
      );
      if (result) return { msg: "별점 업데이트 완료" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ReviewService;
