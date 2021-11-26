const express = require("serverless-express/express");
const ctrl = require("./selllist.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo",
  validation(joi.selllist.params, "params"),
  ctrl.selllist,
);
router.get(
  "/:userNo/finish",
  validation(joi.selllist.params, "params"),
  ctrl.endSelllist,
);

module.exports = router;
