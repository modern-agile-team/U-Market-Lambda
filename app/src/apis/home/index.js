const express = require("serverless-express/express");
const ctrl = require("./home.ctrl");

const router = express.Router();

router.get("/today", ctrl.home.today);
router.get("/by-price", ctrl.home.byPrice);
router.get("/users/:userNo/viewed-products", ctrl.home.viewedProducts);

module.exports = router;
