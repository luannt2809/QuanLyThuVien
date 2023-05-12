var express = require("express");
var router = express.Router();
var cateController = require("../controllers/categories.controller");

router.get("/", cateController.list);

router.get("/add", cateController.add);
router.post("/add", cateController.postCate);

router.get("/edit/:id", cateController.edit);
router.post("/edit/:id", cateController.putCate);

router.get("/search/", cateController.search);

module.exports = router;