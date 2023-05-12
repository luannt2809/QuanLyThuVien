var bookModel = require("../models/books.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  try {
    const searchKeyword = req.query.keyword || "";
    const searchCategory = req.query.category || "";

    let books = await bookModel.bookModel.find().populate("cateId");
    let categories = await bookModel.cateModel.find();

    const query = {};

    if (searchKeyword) {
      query.name = { $regex: searchKeyword, $options: "i" };
    }

    if (searchCategory) {
      query.cateId = searchCategory;
    }

    res.render("books/list", {
      books: books,
      searchCategory: searchCategory,
      searchKeyword: searchKeyword,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.add = async (req, res, next) => {
  let msg = "";
  try {
    let categories = await bookModel.cateModel.find();

    res.render("books/add", {
      categories: categories,
      msg: msg,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postBook = async (req, res, next) => {
  let url_image = "";
  let base64_image = "";
  let msg = "";

  try {
    let categories = await bookModel.cateModel.find();

    if (
      req.body.name.length === 0 ||
      req.body.author.length === 0 ||
      req.body.priceBook.length === 0 ||
      req.body.priceRent.length === 0 ||
      req.body.quantity.length === 0 ||
      req.body.nxb.length === 0
    ) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("books/add", { msg: msg, categories: categories });
      return;
    }

    if (!req.file) {
      msg = "Vui lòng chọn ảnh !!!";
      res.render("books/add", { msg: msg, categories: categories });
      return;
    }

    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          url_image = "/uploads/" + req.file.originalname;
          var fileImage = fs.readFileSync("public" + url_image, {
            encoding: "base64",
          });
          base64_image =
            "data:image/png;base64," + fileImage.toString("base64");
          const newBook = new bookModel.bookModel({
            name: req.body.name,
            author: req.body.author,
            priceBook: req.body.priceBook,
            priceRent: req.body.priceRent,
            quantity: req.body.quantity,
            nxb: req.body.nxb,
            image: base64_image,
            cateId: req.body.cateId,
          });
          console.log(req.body);
          await bookModel.bookModel.create(newBook);
          res.redirect("/books");
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res, next) => {
  try {
    const book = await bookModel.bookModel
      .findOne({
        _id: req.params.id,
      })
      .populate("cateId");

    res.render("books/view", { book: book });
  } catch (err) {
    console.error(err);
  }
};

exports.edit = async (req, res, next) => {
  let msg = "";
  try {
    let categories = await bookModel.cateModel.find();

    const book = await bookModel.bookModel
      .findOne({
        _id: req.params.id,
      })
      .populate("cateId");

    res.render("books/edit", {
      categories: categories,
      book: book,
      msg: msg,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.putBook = async (req, res, next) => {
  let url_image = "";
  let base64_image = "";
  let msg = "";

  try {
    let categories = await bookModel.cateModel.find();
    const book = await bookModel.bookModel
      .findOne({
        _id: req.params.id,
      })
      .populate("cateId");

    if (
      req.body.name.length === 0 ||
      req.body.author.length === 0 ||
      req.body.priceBook.length === 0 ||
      req.body.priceRent.length === 0 ||
      req.body.quantity.length === 0 ||
      req.body.nxb.length === 0
    ) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("books/add", { msg: msg, categories: categories });
      return;
    }

    if (!req.file) {
      await bookModel.bookModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        author: req.body.author,
        priceBook: req.body.priceBook,
        priceRent: req.body.priceRent,
        quantity: req.body.quantity,
        nxb: req.body.nxb,
        image: book.image,
        cateId: req.body.cateId,
      });
      res.redirect("/books");
    }

    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          url_image = "/uploads/" + req.file.originalname;
          var fileImage = fs.readFileSync("public" + url_image, {
            encoding: "base64",
          });
          base64_image =
            "data:image/png;base64," + fileImage.toString("base64");
          await bookModel.bookModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            author: req.body.author,
            priceBook: req.body.priceBook,
            priceRent: req.body.priceRent,
            quantity: req.body.quantity,
            nxb: req.body.nxb,
            image: base64_image,
            cateId: req.body.cateId,
          });
          res.redirect("/books");
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let book = await bookModel.bookModel
      .findById(req.params.id)
      .populate("cateId");

    res.render("books/delete", { book: book });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await bookModel.bookModel.deleteOne({ _id: req.params.id });
    res.redirect("/books");
  } catch (err) {
    console.error(err);
  }
};

exports.searchBook = async (req, res, next) => {
  try {
    const searchKeyword = req.query.keyword || "";
    const searchCategory = req.query.category || "";

    const query = {};

    if (searchKeyword) {
      query.name = { $regex: searchKeyword, $options: "i" };
    }

    if (searchCategory) {
      query.cateId = searchCategory;
    }

    let books = await bookModel.bookModel.find(query).populate("cateId");
    let categories = await bookModel.cateModel.find();

    res.render("books/list", {
      books: books,
      categories: categories,
      searchCategory: searchCategory,
      searchKeyword: searchKeyword,
    });
  } catch (err) {
    console.error(err);
  }
};
