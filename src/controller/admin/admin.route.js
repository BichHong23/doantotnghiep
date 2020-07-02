const express = require("express");

const controller = require("./admin.controller");

const router = express.Router();

//Khóa học tầng 1
router.get("/", controller.index);
router.get("/index", controller.index);
router.get("/course/new", controller.courseOneNew);
router.get("/course/edit/:id", controller.courseOne);
router.get("/course/delete/:id", controller.courseDelete);

router.post("/course/edit", controller.saveCourse);

//Lớp hoc và bài tập tầng 2

router.get("/class/:courseid/new", controller.classOneNew);
router.get("/class/:courseid/edit/:classid", controller.classOne);
router.get("/class/:courseid/delete/:classid", controller.classDelete);

router.post("/class/edit", controller.saveClass);

router.get("/exercise/:courseid/new", controller.exerciseOneNew);
router.get("/exercise/:courseid/edit/:exerciseid", controller.exerciseOne);
router.get("/exercise/:courseid/delete/:exerciseid", controller.exerciseDelete);

router.post("/exercise/edit", controller.saveExercise);

//Thời gian học tầng 3

router.get("/:courseid/classtime/:classid/new", controller.classTimeOneNew);
router.get("/:courseid/classtime/:classid/edit/:id", controller.classTimeOne);
router.get("/:courseid/classtime/:classid/delete/:id", controller.classTimeDelete);

router.post("/classtime/edit", controller.saveClassTime);

//Slide của thời gian học tầng 4

router.get("/:courseid/classtime/:classid/classtimeslide/:classslideid/new", controller.slideOneNew);
router.get("/:courseid/classtime/:classid/classtimeslide/:classslideid/edit/:id", controller.slideOne);
router.get("/:courseid/classtime/:classid/classtimeslide/:classslideid/delete/:id", controller.slideDelete)

router.post("/classtimeslide/edit", controller.saveClassTimeSlide);

//Câu hỏi của exercise

router.get("/:courseid/question/:exerciseid/new", controller.questionOneNew);
router.get("/:courseid/question/:exerciseid/edit/:id", controller.questionOne);
router.get("/:courseid/question/:exerciseid/delete/:id", controller.questionDelete);

router.post("/question/edit", controller.saveQuestion);

//Tài liệu trong class

router.get("/:courseid/document/:classid/new", controller.documentOneNew);
router.get("/:courseid/document/:classid/edit/:id", controller.documentOne);
router.get("/:courseid/document/:classid/delete/:id", controller.documentDelete);

router.post("/document/edit", controller.saveDocument);

//Quản lý học sinh

router.get("/student", controller.studentlist);
router.get("/student/new", controller.studentOneNew);
router.get("/student/edit/:id", controller.studentOne);
router.get("/student/delete/:id", controller.deleteStudentOne);

router.post("/student/edit", controller.saveStudent);

//Quản lý giáo viên

router.get("/teacher", controller.teacherlist);
router.get("/teacher/new", controller.teacherOneNew);
router.get("/teacher/edit/:id", controller.teacherOne);
router.get("/teacher/delete/:id", controller.deleteTeacherOne);

router.post("/teacher/edit", controller.saveTeacher);

module.exports = router;
