const express = require("serverless-express/express");
const ctrl = require("./image.ctrl");
const {
  upload,
  profileUpload,
  communityUpload,
} = require("../../middleware/image");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post("/product", upload.array("upload", 5), ctrl.upload);
router.post("/store", validation(joi.image.body, "body"), ctrl.saveImage);

router.post("/profile", profileUpload.single("upload"), ctrl.profileUpload);
router.post(
  "/community",
  communityUpload.array("upload", 5),
  ctrl.communityUpload,
);

router.delete("/", ctrl.delete);

module.exports = router;
