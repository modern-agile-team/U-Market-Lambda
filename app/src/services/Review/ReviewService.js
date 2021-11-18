const ReviewRepository = require("../../repository/Review/ReviewRepository");
const ChatRepository = require("../../repository/Chat/ChatRepository");
const UserRepository = require("../../repository/User/UserRepository");

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

  async createReview() {
    const information = this.body;

    try {
      const review = await ReviewRepository.createReview(information);
      if (review) return { msg: "리뷰 작성 완료" };
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
