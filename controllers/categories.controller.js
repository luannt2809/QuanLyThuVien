var cateModel = require("../models/books.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  let categories = await cateModel.cateModel.find();
  const keyword = req.query.keyword || "";

  res.render("categories/list", { categories: categories, keyword: keyword });
};

exports.add = (req, res, next) => {
  let msg = "";
  res.render("categories/add", { msg: msg });
};

exports.postCate = async (req, res, next) => {
  let msg = "";
  try {
    if (req.body.name.length === 0) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("categories/add", { msg: msg });
      return;
    }

    const newCate = new cateModel.cateModel({
      name: req.body.name,
      image: "https://cdn-icons-png.flaticon.com/512/10588/10588207.png",
    });
    await cateModel.cateModel.create(newCate);
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
  }
};

exports.edit = async (req, res, next) => {
  let msg = "";
  try {
    const category = await cateModel.cateModel.findOne({
      _id: req.params.id,
    });

    res.render("categories/edit", {
      category: category,
      msg: msg,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.putCate = async (req, res, next) => {
  let msg = "";
  try {
    if (req.body.name.length === 0) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("categories/add", { msg: msg });
      return;
    }

    await cateModel.cateModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      image: "https://cdn-icons-png.flaticon.com/512/10588/10588207.png",
    });
    await res.redirect(`/categories`);
  } catch (err) {
    console.error(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const regex = new RegExp(keyword, "i");

    let categories = await cateModel.cateModel.find({ name: regex });

    res.render("categories/list", {
      categories: categories,
      keyword: keyword,
    });
  } catch (err) {
    console.error(err);
  }
};
