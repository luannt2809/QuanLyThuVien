var express = require("express");
var router = express.Router();
var accountController = require("../controllers/account.controller");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

router.get("/", accountController.list);

router.get("/add", accountController.add);
router.post("/add", uploader.single("avatar"), accountController.postAccount);

router.get("/view/:id", accountController.view);

router.get("/edit/:id", accountController.edit);
router.post(
  "/edit/:id",
  uploader.single("avatar"),
  accountController.putAccount
);

router.get("/delete/:id", accountController.delete);
router.post("/delete/:id", accountController.deleteAccount);

router.get("/search/", accountController.search);

module.exports = router;
