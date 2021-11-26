const express = require("serverless-express/express");
const ctrl = require("./home.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get("/today", ctrl.home.today);
router.get(
  "/by-price",
  validation(joi.home.byPrice, "query"),
  ctrl.home.byPrice,
);
router.get(
  "/users/:userNo/viewed-products",
  validation(joi.home.viewedProducts.query, "query"),
  validation(joi.home.viewedProducts.params, "params"),
  ctrl.home.viewedProducts,
);

module.exports = router;
