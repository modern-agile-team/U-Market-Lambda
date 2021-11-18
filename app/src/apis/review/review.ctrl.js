const logger = require("../../config/logger");
const ReviewService = require("../../services/Review/ReviewService");

const process = {
  createReview: async (req, res, next) => {
    try {
      const review = new ReviewService(req);
      const response = await review.createReview();

      logger.info(`POST /api/review 201 리뷰 생성 완료`);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },

  findBuyerByUserNo: async (req, res, next) => {
    try {
      const buyerlist = new ReviewService(req);
      const response = await buyerlist.findBuyerByUserNo();

      logger.info(
        `GET /api/review/${req.params.userNo}?product=${req.query.product} 200 살 사람 조회 완료`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  updateTrustScore: async (req, res, next) => {
    try {
      const review = new ReviewService(req);
      const response = await review.updateTrustScore();

      logger.info(
        `POST /api/review/${req.params.userNo} 201 별점 업데이트 완료`,
      );
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
