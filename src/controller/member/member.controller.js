const paginate = require("express-paginate");
const passport = require("passport");
const useRepo = require("../../repository/member/member.repo");
exports.login = async (req, res) => {
  //console.log("login");
  res.render("member/login", {
    title: "Đăng nhập",
    tab: 1,
    data: {},
    message: req.flash("loginMessage")
  });
};

exports.logout = async (req, res) => {
  req.session.destroy(function(err) {
    // cannot access session here
  });
  res.redirect("/member/login");
};

exports.signin = async (req, res) => {
  const {
    regemail,
    regname,
    regphone,
    regpassword,
    confirmpassword
  } = req.body;

  if (!regemail) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: "Vui lòng nhập email !",
      data: req.body
    });
    return;
  }

  if (!regname) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: "Vui lòng nhập tên !",
      data: req.body
    });
    return;
  }

  if (!regphone) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: "Vui lòng nhập số điện thoại !",
      data: req.body
    });
    return;
  }

  if (!regpassword) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: "Vui lòng nhập số mật khẩu !",
      data: req.body
    });
    return;
  }
  if (regpassword != confirmpassword) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: "Mật khẩu nhập lại không đúng !",
      data: req.body
    });
    return;
  }
  const msg = await useRepo.create(regemail, regname, regphone, regpassword);

  if (msg.trim().length > 0) {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 2,
      message: msg,
      data: req.body
    });
  } else {
    res.render("member/login", {
      title: "Đăng nhập",
      tab: 1,
      message: "Đăng ký thành công",
      data: {}
    });
  }
};

exports.postLogin = (req, res, next) =>
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
