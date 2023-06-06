var accountModel = require("../models/accounts.model");
var fs = require("fs");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    console.log(req.body);
    try {
      let account = await accountModel.accountModel.findOne({
        username: req.body.username,
      });
      if (account != null) {
        let checkpass = await bcrypt.compare(req.body.passwd, account.passwd);
        console.log("check pass hashcode: " + checkpass);
        if (checkpass == true) {
          if (account.roleId != "645baad7738c215da807bae5") {
            msg = "Bạn không phải là quản trị viên.";
          } else {
            req.session.accountLogin = account;
            msg = "";
            return res.redirect("/");
          }
        } else {
          msg = "Sai mật khẩu.";
        }
      } else {
        msg = "Tài khoản không tồn tại.";
      }
    } catch (err) {
      console.error(err);
    }
  }
  res.render("accounts/login", { msg: msg });
};

exports.list = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";

    let accounts = await accountModel.accountModel
      .find({ roleId: "645baaef738c215da807bae6" })
      .populate("roleId");

    res.render("accounts/list", { accounts: accounts, keyword, keyword });
  } catch (err) {
    console.error(err);
  }
};

exports.add = (req, res, next) => {
  let msg = "";
  res.render("accounts/add", { msg: msg });
};

exports.postAccount = async (req, res, next) => {
  let url_avatar = "";
  let base64_avatar = "";
  let msg = "";

  try {
    if (
      req.body.username.trim().length === 0 ||
      req.body.passwd.trim().length === 0 ||
      req.body.fullname.trim().length === 0 ||
      req.body.email.trim().length === 0
    ) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("accounts/add", { msg: msg });
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(req.body.email)) {
      msg = "Vui lòng nhập đúng định dạng email !!!";
      res.render("accounts/add", { msg: msg });
      return;
    }

    if (!req.file) {
      msg = "Vui lòng chọn ảnh đại diện !!!";
      res.render("accounts/add", { msg: msg });
      return;
    }

    const checkUsername = await accountModel.accountModel.findOne({
      username: req.body.username,
    });
    if (checkUsername) {
      msg = "Username đã tồn tại !!!";
      res.render("accounts/add", { msg: msg });
      return;
    }

    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          url_avatar = "/uploads/" + req.file.originalname;
          var fileImage = fs.readFileSync("public" + url_avatar, {
            encoding: "base64",
          });
          base64_avatar =
            "data:image/png;base64," + fileImage.toString("base64");
          const salt = await bcrypt.genSalt(15);
          let pass = await bcrypt.hash(req.body.passwd, salt);
          const newAccount = new accountModel.accountModel({
            username: req.body.username,
            passwd: pass,
            fullname: req.body.fullname,
            avatar: base64_avatar,
            email: req.body.email,
            roleId: "645baaef738c215da807bae6",
          });
          console.log(req.body);
          await accountModel.accountModel.create(newAccount);
          res.redirect("/accounts");
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

exports.view = async (req, res, next) => {
  try {
    let account = await accountModel.accountModel
      .findById(req.params.id)
      .populate("roleId");

    res.render("accounts/view", { account: account });
  } catch (err) {
    console.error(err);
  }
};

exports.edit = async (req, res, next) => {
  let msg = "";
  try {
    let account = await accountModel.accountModel
      .findById(req.params.id)
      .populate("roleId");

    console.log(req.body);

    res.render("accounts/edit", { account: account, msg: msg });
  } catch (err) {
    console.error(err);
  }
};

exports.putAccount = async (req, res, next) => {
  let url_avatar = "";
  let base64_avatar = "";
  let msg = "";

  try {
    let account = await accountModel.accountModel
      .findById(req.params.id)
      .populate("roleId");

    if (
      // req.body.username.length === 0 ||
      req.body.fullname.length === 0 ||
      req.body.email.length === 0
    ) {
      msg = "Vui lòng nhập đủ thông tin !!!";
      res.render("accounts/edit", { msg: msg, account: account });
      return;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(req.body.email)) {
      msg = "Vui lòng nhập đúng định dạng email !!!";
      res.render("accounts/edit", { msg: msg, account: account });
      return;
    }

    // const checkUsername = await accountModel.accountModel.findOne({
    //   username: req.body.username,
    // });
    // if (checkUsername) {
    //   msg = "Username đã tồn tại !!!";
    //   res.render("accounts/edit", { msg: msg, account: account });
    //   return;
    // }

    if (!req.file) {
      // const salt = await bcrypt.genSalt(15)
      // let pass = await bcrypt.hash(req.body.passwd, salt);
      // accountModel.accountModel.findByIdAndUpdate(req.params.id, {
      //   username: account.username,
      //   passwd: pass,
      //   avatar: account.avatar,
      //   email: req.body.email,
      //   fullname: req.body.fullname,
      //   roleId: "645baaef738c215da807bae6",
      // });
      // res.redirect("/accounts");
      if (!req.body.passwd) {
        const oldPasswd = account.passwd;
        account.passwd = oldPasswd;
        await accountModel.accountModel.findByIdAndUpdate(req.params.id, {
          username: account.username,
          passwd: oldPasswd,
          email: req.body.email,
          fullname: req.body.fullname,
          avatar: account.avatar,
          roleId: "645baaef738c215da807bae6",
        });
        res.redirect("/accounts");
      } else {
        const salt = await bcrypt.genSalt(15);
        let pass = await bcrypt.hash(req.body.passwd, salt);
        await accountModel.accountModel.findByIdAndUpdate(req.params.id, {
          username: account.username,
          passwd: pass,
          email: req.body.email,
          fullname: req.body.fullname,
          avatar: account.avatar,
          roleId: "645baaef738c215da807bae6",
        });
        res.redirect("/accounts");
      }
    } else {
      fs.rename(
        req.file.path,
        "./public/uploads/" + req.file.originalname,
        async (err) => {
          if (err) {
            console.log(err);
          } else {
            url_avatar = "/uploads/" + req.file.originalname;
            var fileImage = fs.readFileSync("public" + url_avatar, {
              encoding: "base64",
            });
            base64_avatar =
              "data:image/png;base64," + fileImage.toString("base64");
            console.log(req.body.passwd);
            if (!req.body.passwd) {
              const oldPasswd = account.passwd;
              account.passwd = oldPasswd;
              await accountModel.accountModel.findByIdAndUpdate(req.params.id, {
                username: account.username,
                passwd: oldPasswd,
                email: req.body.email,
                fullname: req.body.fullname,
                avatar: base64_avatar,
                roleId: "645baaef738c215da807bae6",
              });
              res.redirect("/accounts");
            } else {
              const salt = await bcrypt.genSalt(15);
              let pass = await bcrypt.hash(req.body.passwd, salt);
              accountModel.accountModel.findByIdAndUpdate(req.params.id, {
                username: account.username,
                passwd: pass,
                avatar: base64_avatar,
                email: req.body.email,
                fullname: req.body.fullname,
                roleId: "645baaef738c215da807bae6",
              });
              res.redirect("/accounts");
            }
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let account = await accountModel.accountModel
      .findById(req.params.id)
      .populate("roleId");

    res.render("accounts/delete", { account: account });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    await accountModel.accountModel.deleteOne({ _id: req.params.id });
    res.redirect("/accounts");
  } catch (err) {
    console.error(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const regex = new RegExp(keyword, "i");

    let accounts = await accountModel.accountModel
      .find({ username: regex })
      .populate("roleId");

    res.render("accounts/list", {
      accounts: accounts,
      keyword: keyword,
    });
  } catch (err) {
    console.error(err);
  }
};
exports.logout = async (req, res, next) => {
  if (req.session != null) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Đăng xuất thành công");
        res.redirect("/accounts/login");
      }
    });
  }
};
