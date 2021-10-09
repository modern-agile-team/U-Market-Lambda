const express = require("serverless-express/express");
const ctrl = require("./products.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/",
  validation(joi.products.root_GET_schema, "query"),
  ctrl.products.home,
);
router.get(
  "/:productNo",
  validation(joi.products.productNo_GET_schema, "params"),
  ctrl.products.detailView,
);

router.post(
  "/",
  validation(joi.products.root_POST_schema, "body"),
  ctrl.products.create,
);

module.exports = router;
