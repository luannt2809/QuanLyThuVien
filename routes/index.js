var express = require("express");
var router = express.Router();
var checkLogin = require("../middleware/check_login");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
