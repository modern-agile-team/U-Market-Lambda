const ctrl = require("./watchlist.ctrl");
const express = require("express");
const joi = require("../../utils/schemas");
const joiValidator = require("../../middleware/validation");

const router = express.Router();

router.get("/:userNo", ctrl.findAllByUserNum);
router.post(
  "/",
  joiValidator(joi.watchlist.watchlist_POST_DELETE_schema, "body"),
  ctrl.create,
);
router.delete(
  "/",
  joiValidator(joi.watchlist.watchlist_POST_DELETE_schema, "body"),
  ctrl.delete,
);

module.exports = router;
