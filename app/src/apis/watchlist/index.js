const ctrl = require("./watchlist.ctrl");
const express = require("express");

const router = express.Router();

router.get("/:userNo", ctrl.findAllByUserNum);
router.post("/", ctrl.create);
router.delete("/", ctrl.delete);

module.exports = router;
