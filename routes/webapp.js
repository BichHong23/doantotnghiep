// const questionRouter = require("../src/controller/question/question.route");
const memberRouter = require("../src/controller/member/member.route");
const adminRouter = require("../src/controller/admin/admin.route");
const homeRouter = require("../src/controller/home/home.route");
const quizRouter = require("../src/controller/quiz/quiz.route");
const documentRouter = require("../src/controller/document/document.route");

const auth = require("../src/utils/auth");

function assign(req, res, next) {
  res.locals.userName = req.session.userName;
  res.locals.gv = req.session.gv;
  res.locals.admin = req.session.admin;
  next();
}
module.exports = server => {
  // server.use("/question", auth.required, assign, questionRouter);
  server.use("/user", assign, memberRouter);
  server.use("/admin", auth.required, assign, adminRouter);
  server.use("/", auth.required, assign, homeRouter);
  server.use("/quiz", auth.required, assign, quizRouter);
  server.use("/document", auth.required, assign, documentRouter);
};
