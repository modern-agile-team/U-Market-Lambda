const express = require("serverless-express/express");
const ctrl = require("./user.ctrl");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);

module.exports = router;
