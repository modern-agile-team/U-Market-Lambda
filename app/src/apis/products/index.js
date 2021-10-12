const express = require("serverless-express/express");
const ctrl = require("./products.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/",
  validation(joi.products.get.query.root, "query"),
  ctrl.products.home,
);
router.get(
  "/:productNo",
  validation(joi.products.get.params.productNo, "params"),
  ctrl.products.detailView,
);

router.post(
  "/",
  validation(joi.products.post.body.root, "body"),
  ctrl.products.create,
);

router.put(
  "/:productNo",
  validation(joi.products.put.params.productNo, "params"),
  validation(joi.products.put.body.productNo, "body"),
  ctrl.products.updateView,
);

module.exports = router;
