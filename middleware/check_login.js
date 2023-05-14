exports.requireLogin = (req, res, next) => {
  if (req.session.accountLogin) {
    next();
  } else {
    res.redirect("/accounts/login");
  }
};

exports.noRequireLogin = (req, res, next) => {
  if (!req.session.accountLogin) {
    next();
  } else {
    res.redirect("/");
  }
};
