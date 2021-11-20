const express = require("serverless-express/express");
const ctrl = require("./search.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/products",
  validation(joi.search.category.query, "query"),
  ctrl.findProductBySearch,
);

router.get(
  "/communities",
  validation(joi.search.category.query, "query"),
  ctrl.findCommunityBySearch,
);

module.exports = router;
