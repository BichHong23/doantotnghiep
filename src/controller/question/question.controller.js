const repo = require("../../repository/question/question.repo");
const paginate = require("express-paginate");
const mongoose = require("mongoose");
const Question = mongoose.model("Question");
exports.index = async (req, res) => {
  try {
    // const data = await repo.getAll();
    // res.render('question/index', { title: 'Câu hỏi', data });

    const [results, itemCount] = await Promise.all([
      Question.find({})
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Question.countDocuments({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);

    const category = await repo.getCategory();
    res.render("question/index", {
      title: "Câu hỏi",
      data: results,
      pageCount,
      itemCount,
      category,
      filter: {
        category: 0
      },
      pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
    });
  } catch (err) {
    res.send(err);
  }
};

exports.search = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Question.find({ category: req.body.category })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Question.countDocuments({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);
    const category = await repo.getCategory();
    res.render("question/index", {
      title: "Câu hỏi",
      data: results,
      pageCount,
      itemCount,
      category,
      filter: {
        category: req.body.category
      },
      pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
    });
  } catch (err) {
    res.send(err);
  }
};

exports.createGet = async (req, res) => {
  try {
    const data = {
      numOfAnswer: 0
    };

    const category = await repo.getCategory();

    res.render("question/create", { title: "Câu hỏi", data, category });
  } catch (err) {
    res.send(err);
  }
};
exports.editGet = async (req, res) => {
  try {
    const data = await repo.getById(req.query.id);

    //console.log(data);
    const category = await repo.getCategory();

    res.render("question/edit", { title: "Câu hỏi", data, category });
  } catch (err) {
    res.send(err);
  }
};

exports.createPost = async (req, res) => {};
