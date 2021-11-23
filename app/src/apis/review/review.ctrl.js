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

  createBuyer: async (req, res, next) => {
    try {
      const review = new ReviewService(req);
      const response = await review.createBuyer();

      logger.info(`POST /api/review/:userNo 201 구매자 저장 완료`);
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

  findAllByWriter: async (req, res, next) => {
    try {
      const reviewlist = new ReviewService(req);
      const response = await reviewlist.findAllByWriter();

      logger.info(
        `GET /api/review/${req.params.userNo}/writer 200 내가 쓴 리뷰 조회 완료`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAllByReceiver: async (req, res, next) => {
    try {
      const reviewlist = new ReviewService(req);
      const response = await reviewlist.findAllByReceiver();

      logger.info(
        `GET /api/review/${req.params.userNo}/receiver 200 남이 쓴 리뷰 조회 완료`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findNotReviewBySeller: async (req, res, next) => {
    try {
      const reviewlist = new ReviewService(req);
      const response = await reviewlist.findNotReviewBySeller();

      logger.info(
        `GET /api/review/${req.params.userNo}/seller 200 자신이 써야 하는 리뷰(판매자) 조회 완료`,
      );
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  findNotReviewByBuyer: async (req, res, next) => {
    try {
      const reviewlist = new ReviewService(req);
      const response = await reviewlist.findNotReviewByBuyer();

      logger.info(
        `GET /api/review/${req.params.userNo}/buyer 200 자신이 써야 하는 리뷰(구매자) 조회 완료`,
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
