var billModel = require("../models/bill.model");
var cateModel = require("../models/books.model");

const moment = require("moment");
exports.list = async (req, res, next) => {
  try {
    const searchKeyword = req.query.keyword || "";
    const searchDateRent = req.query.searchDateRent || "";
    const searchDatePay = req.query.searchDatePay || "";
    const searchStatus = req.query.searchStatus || -1;

    let bills = await billModel.ModelBill.find()
      .populate("accountId")
      .populate("bookId.idBook");

    if (searchKeyword) {
      query.phone = { $regex: searchKeyword };
    }

    res.render("bills/list", {
      bills: bills,
      searchKeyword: searchKeyword,
      searchDateRent: searchDateRent,
      searchDatePay: searchDatePay,
      searchStatus: searchStatus,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res, next) => {
  try {
    let bill = await billModel.ModelBill.findById(req.params.id)
      .populate("accountId")
      .populate("bookId.idBook");

    let categories = await cateModel.cateModel.find();

    res.render("bills/view", {
      bill: bill,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    let bill = await billModel.ModelBill.findById(req.params.id)
      .populate("accountId")
      .populate("bookId.idBook");

    res.render("bills/edit", {
      bill: bill,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.putBill = async (req, res, next) => {
  const bill = await billModel.ModelBill.findOne({ _id: req.params.id });

  try {
    await billModel.ModelBill.findByIdAndUpdate(req.params.id, {
      bookId: bill.bookId,
      accountId: bill.accountId,
      imageCCCD: bill.imageCCCD,
      datePay: bill.datePay,
      dateRent: bill.dateRent,
      fullname: bill.fullname,
      phone: bill.phone,
      totalPrice: bill.totalPrice,
      status: req.body.status,
    });
    await res.redirect(`/bills`);
  } catch (err) {
    console.error(err);
  }
};

exports.searchBill = async (req, res, next) => {
  try {
    const searchKeyword = req.query.keyword || "";
    // const phoneNumberRegex = /^(?:\+?84|0)(?:\d{9}|\d{10})$/;
    const searchDateRent = req.query.searchDateRent || "";
    const searchDatePay = req.query.searchDatePay || "";
    const searchStatus = req.query.searchStatus || -1;
    const query = {};

    if (searchKeyword) {
      query.phone = { $regex: searchKeyword };
    }
    if (searchDateRent) {
      const dateNew = moment(searchDateRent).format("YYYY/MM/DD");
      query.dateRent = dateNew;
    }
    if (searchDatePay) {
      const dateNew = moment(searchDatePay).format("YYYY/MM/DD");
      query.datePay = dateNew;
    }
    if (searchStatus!=-1) {
      query.status = searchStatus
    }
    console.log(query);
    let bills = await billModel.ModelBill.find(query)
      .populate("accountId")
      .populate("bookId.idBook");

    res.render("bills/list", {
      bills: bills,
      searchKeyword: searchKeyword,
      searchDateRent: searchDateRent,
      searchDatePay: searchDatePay,
      searchStatus: searchStatus,
    });
  } catch (err) {
    console.error(err);
  }
};
