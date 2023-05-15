var express = require("express");
var router = express.Router();
var billCtrl = require("../controllers/bill.controller");
var checkLogin = require("../middleware/check_login");

router.get("/", billCtrl.list);

router.get("/view/:id", billCtrl.view);

router.get("/edit/:id", billCtrl.edit);
router.post("/edit/:id", billCtrl.putBill);

router.get("/search/", billCtrl.searchBill);

module.exports = router;
