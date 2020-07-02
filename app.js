const createError = require("http-errors");
const express = require("express");
const paginate = require("express-paginate");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// keep this before all routes that will use pagination

const app = express();

app.use(paginate.middleware(10, 50));
app.use(
  session({
    secret: "CKN",
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: false,
      maxAge: 2160000000,
      httpOnly: false
    }
  })
);
app.use(flash());
app.use(paginate.middleware(10, 50));
app.use(passport.initialize());
app.use(passport.session());
// require("./src/utils/mongoose");
require("./src/utils/passport")(passport);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
require("./routes/webapp")(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
app.use(flash());
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.name === "UnauthorizedError") {
    res.redirect("/user/login");
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
