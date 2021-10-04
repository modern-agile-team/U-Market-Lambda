const express = require("serverless-express/express");
const ctrl = require("./communities.ctrl");

const router = express.Router();

router.get("/:categoryNo", ctrl.communities.home);

module.exports = router;
