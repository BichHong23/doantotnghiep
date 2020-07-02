const mongoose = require("mongoose");
const userRepo = require("../../repository/member/member.repo");
const courseRepo = require("../../repository/course/course.repo");

exports.index = async (req, res) => {
  const courses = await courseRepo.getAll();
  res.render("course/index", { title: "Trang chủ", data: courses });
};

exports.detail = async (req, res) => {
  res.render("course/coursedetail", { title: "Trang chủ" });
};

exports.classdetail = async (req, res) => {
  const data0 = await courseRepo.getClassByType(req.params.id, 0);
  const data1 = await courseRepo.getClassByType(req.params.id, 1);
  res.render("course/classdetail", { title: "Trang chủ", data0, data1 });
};

exports.ajaxclassTime = async (req, res) => {
  const data = await courseRepo.getClassTime(req.body.classId);
  res.json(data);
};

exports.lession = async (req, res) => {
  const member = await userRepo.findById(req.session.userId);
  // const courses = await courseRepo.getAll();
  const classTime = req.query.classTime;
  const classId = req.query.classId;
  const slides = await userRepo.getSlides(classTime);
  // res.render("course/course", { title: "Trang chủ", data: courses });
  res.render("course/class", {
    title: "Trang chủ",
    data: { user: member, classTime, classId, slides }
  });
};

exports.class = async (req, res) => {
  // const member = await userRepo.findById(req.session.userId);
  const courses = await courseRepo.getAll();
  res.render("course/course", { title: "Trang chủ", data: courses });
  // res.render("course/course", { title: "Trang chủ", data: { user: member } });
};

exports.technical = async (req, res) => {
  res.render("course/technical", { title: "Trang chủ" });
};
