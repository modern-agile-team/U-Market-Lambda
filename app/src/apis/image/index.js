const express = require("serverless-express/express");
const ctrl = require("./image.ctrl");
const { upload } = require("../../middleware/image");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.post("/", upload.array("upload", 5), ctrl.upload);
router.post(
  "/store",
  validation(joi.image.POST_schema, "body"),
  ctrl.saveImage,
);
router.delete("/", ctrl.delete);

module.exports = router;
