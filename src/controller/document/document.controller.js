const mongoose = require("mongoose");

const courseAction = require('../../repository/course/course.repo');
const documentAction = require('../../repository/document/document.repo');

exports.index = async (req, res) => {

  courseAction.getAll().then(function(value) {
    res.render("document/index", {
      title: "Danh sách khóa học",
      listCourse: value
    });
  });
};

exports.detail = async (req, res) => {

  if(req.params.week == null) {
    req.params.week = 1;
  }

  documentAction.getDocument(req.params.idcourse, req.params.week).then(function(value) {

    courseAction.getOneCourse(req.params.idcourse).then(function(valueCourse) {
      res.render("document/detail", {
        title: "Danh sách tài liệu",
        document: value,
        course: valueCourse,
        linkRoot: req.headers.host
      });
    });
  });
};
