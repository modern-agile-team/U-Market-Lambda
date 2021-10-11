const express = require("serverless-express/express");
const ctrl = require("./selllist.ctrl");

const router = express.Router();

router.get("/:userNo", ctrl.selllist);
router.get("/finish/:userNo", ctrl.endSelllist);

module.exports = router;
