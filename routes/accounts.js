var express = require("express");
var router = express.Router();
var accountController = require("../controllers/account.controller");
var checkLogin = require("../middleware/check_login");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

// router.use(checkLogin.requireLogin);

router.get("/login", accountController.login);
router.post("/login", accountController.login);

router.get("/", checkLogin.requireLogin, accountController.list);

router.get("/add", checkLogin.requireLogin, accountController.add);
router.post(
  "/add",
  checkLogin.requireLogin,
  uploader.single("avatar"),
  accountController.postAccount
);

router.get("/view/:id", checkLogin.requireLogin, accountController.view);

router.get("/edit/:id", checkLogin.requireLogin, accountController.edit);
router.post(
  "/edit/:id",
  checkLogin.requireLogin,
  uploader.single("avatar"),
  accountController.putAccount
);

router.get("/delete/:id", checkLogin.requireLogin, accountController.delete);
router.post(
  "/delete/:id",
  checkLogin.requireLogin,
  accountController.deleteAccount
);

router.get("/search/", checkLogin.requireLogin, accountController.search);

module.exports = router;
