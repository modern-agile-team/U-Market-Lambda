const express = require("serverless-express/express");
const ctrl = require("./products.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/",
  validation(joi.products.query.root, "query"),
  ctrl.products.home,
);

router.get(
  "/categories/:categoryNo",
  validation(joi.products.params.categoryNo, "params"),
  validation(joi.products.query.categoryNo, "query"),
  ctrl.products.findAllByCategory,
);

router.get(
  "/trade/:userNo",
  validation(joi.products.params.userNo, "params"),
  ctrl.products.findAllTradingProduct,
);

router.get(
  "/trade/finish/:userNo",
  validation(joi.products.params.userNo, "params"),
  ctrl.products.findAllTradeFinish,
);

router.get(
  "/purchase/finish/:userNo",
  validation(joi.products.params.userNo, "params"),
  ctrl.products.purchaseFinish,
);

router.get(
  "/:productNo/:userNo",
  validation(joi.products.params.detail, "params"),
  ctrl.products.detailView,
);

router.get(
  "/category",
  validation(joi.products.query.category, "query"),
  ctrl.products.findAllByDetailCategory,
);

router.post(
  "/",
  validation(joi.products.body.root, "body"),
  ctrl.products.create,
);

router.put(
  "/:productNo",
  validation(joi.products.params.productNo, "params"),
  validation(joi.products.body.productNo, "body"),
  ctrl.products.updateView,
);

router.patch(
  "/:productNo",
  validation(joi.products.params.productNo, "params"),
  ctrl.products.updateHit,
);

router.patch(
  "/:productNo/status",
  validation(joi.products.params.productNo, "params"),
  validation(joi.products.body.status, "body"),
  ctrl.products.updateStatus,
);

router.delete(
  "/:productNo",
  validation(joi.products.params.productNo, "params"),
  ctrl.products.delete,
);

module.exports = router;
