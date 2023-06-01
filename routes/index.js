var express = require("express");
var router = express.Router();
var checkLogin = require("../middleware/check_login");
var accountModel = require("../models/accounts.model");
var billModel = require("../models/bill.model");
var bookModel = require("../models/books.model");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let countAccount = await accountModel.accountModel.countDocuments({roleId: '645baaef738c215da807bae6'});
  let countBook = await bookModel.bookModel.countDocuments();
  let countBill = await billModel.ModelBill.countDocuments();
  let bills = await billModel.ModelBill.find();

  res.render("index", {
    countAccount: countAccount,
    countBook: countBook,
    countBill: countBill,
    bills: bills,
  });
});

module.exports = router;
