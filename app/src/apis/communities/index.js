const express = require("serverless-express/express");
const ctrl = require("./communities.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

// comunity
router.post(
  "/",
  validation(joi.communities.body.root, "body"),
  ctrl.communities.create,
);

// communities
router.get(
  "/",
  validation(joi.communities.query.root, "query"),
  ctrl.communities.home,
);
router.get(
  "/:communityNo/:userNo",
  validation(joi.communities.params.detail, "params"),
  ctrl.communities.detail,
);

router.put(
  "/:communityNo",
  validation(joi.communities.params.communityNo, "params"),
  validation(joi.communities.body.communityNo, "body"),
  ctrl.communities.updateView,
);

router.post(
  "/:communityNo",
  validation(joi.communities.params.communityNo, "params"),
  validation(joi.communities.body.likeCnt, "body"),
  ctrl.communities.updateLikeCnt,
);

router.patch(
  "/:communityNo/hit",
  validation(joi.communities.params.communityNo, "params"),
  ctrl.communities.updateHit,
);

router.delete(
  "/:communityNo",
  validation(joi.communities.params.communityNo, "params"),
  ctrl.communities.delete,
);

module.exports = router;
