const mongoose = require("mongoose");
const quizRepo = require("../../repository/question/question.repo");
exports.index = async (req, res) => {
  const data = await quizRepo.getAllQuiz(req.session.userId);
  res.render("quiz/index", { data, title: "Danh sách bài tập" });
};

exports.result = async (req, res) => {
  const data = await quizRepo.getQuestion(req.query.id);
  console.log(data);
  for (i = 0; i < data.length; i++) {
    const s = await quizRepo.getchoice(
      req.session.userId,
      req.query.id,
      data[i].ID
    );

    if (s) {
      data[i].choice = s.INDEX_ANSWER;
    }
  }
  console.log(data);

  var numberRight = await quizRepo.getNumberRight(req.session.userId);

  res.render("quiz/result", {
    data,
    exerciseId: req.query.id,
    numberRight: numberRight.RIGHTNUM,
    title: "Chi tiết bài tập"
  });
};

exports.detail = async (req, res) => {
  const data = await quizRepo.getQuestion(req.query.id);
  console.log(data);
  res.render("quiz/detail", {
    data,
    exerciseId: req.query.id,
    title: "Chi tiết bài tập"
  });
};

exports.create = async (req, res) => {
  console.log(req.body.optionsradios);
  const size = parseInt(req.body.size);
  await quizRepo.deleteQuestion(req.session.userId, req.body.exerciseId);
  for (i = 0; i < size; i++) {
    const q = req.body["optionsradios" + i];
    const s = q.split("_");
    if (s.length < 2) {
    } else {
      await quizRepo.saveQuestion(
        req.session.userId,
        req.body.exerciseId,
        s[0],
        s[1]
      );
    }
  }
  res.redirect("/quiz");
};
