const express = require("serverless-express/express");
const ctrl = require("./home.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get("/today", ctrl.home.today);
router.get(
  "/by-price",
  validation(joi.search_GET_schema, "query"),
  ctrl.home.byPrice,
);
router.get(
  "/users/:userno/viewed-products",
  validation(joi.view_query_GET_schema, "query"),
  validation(joi.view_params_GET_schema, "params"),
  ctrl.home.viewedProducts,
);

module.exports = router;
