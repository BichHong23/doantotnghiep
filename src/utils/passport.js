// const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const util = require("../utils/Utility");
// const Member = mongoose.model("Member");
const Member = require("../repository/member/member.repo");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.ID);
  });

  passport.deserializeUser(function(id, done) {
    Member.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err, null));
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        Member.findByEmail(email)
          .then(user => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Không tìm thấy người dùng này!")
              );
            }

            if(user.PASSWORD != password) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Mật khẩu không đúng!")
              );
            }

            req.session.access_token = util.generateJWT(user.ID);
            req.cookies.access_token = util.generateJWT(user.ID);
            // req.session.user = JSON.stringify(user);

            req.session.userId = user.ID.toString();
            req.session.userName = user.NAME.toString();
            req.session.gv = parseInt(user.ROLE) == 2 ? "gv" : "";
            req.session.admin = parseInt(user.ROLE) == 3 ? "admin" : "";
            return done(null, user);
          })
          .catch(err => {
            return done(null, false, req.flash("loginMessage", err.toString()));
          });
      }
    )
  );
};
