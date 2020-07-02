const mongoose = require("mongoose");

const courseManageAction = require('../../repository/admin/courseManage.repo');
const studentAction = require('../../repository/admin/student.repo');
const teacherAction = require('../../repository/admin/teacher.repo');

var formidable = require('formidable');
var fs = require('fs');
var appRoot = require('app-root-path');

exports.index = async (req, res) => {
  courseManageAction.getAllCourseManage().then(function(value) {
    res.render("admin/index", {
      title: "Trang chủ admin",
      listCourse: value
    });
  });
};

exports.courseOneNew = async (req, res) => {
  res.render("admin/coursedetailnew", { title: "Trang thêm mới khóa học" });
};

exports.courseOne = async (req, res) => {
  courseManageAction.getOneCourse(req.params.id).then(function(valueCourse) {
    courseManageAction.getAllClassOfCourse(req.params.id).then(function(valueClass) {
      courseManageAction.getAllExerciseOfCourse(req.params.id).then(function(valueExercise) {
        res.render("admin/coursedetail", {
          title: "Trang chỉnh sửa khóa học",
          courseOne: valueCourse,
          classList: valueClass,
          homeworkList: valueExercise
        });
      });
    });
  });
};

exports.courseDelete = async (req, res) => {
  courseManageAction.courseDelete(req.params.id).then(function(valueCourse) {
    res.redirect("/admin/index");
  });
};

exports.classOneNew = async (req, res) => {
  res.render("admin/classdetailnew", {
    title: "Trang thêm mới lớp học",
    courseId: req.params.courseid
  });
};

exports.exerciseOneNew = async (req, res) => {
  res.render("admin/exercisedetailnew", {
    title: "Trang thêm mới bài tập",
    courseId: req.params.courseid
  });
};

exports.classOne = async (req, res) => {
  courseManageAction.getOneClass(req.params.classid).then(function(valueClassOne) {
    courseManageAction.getAllClassTimeOfClass(req.params.classid).then(function(valueClassTime) {
      courseManageAction.getAllDocumentOfCourse(req.params.classid).then(function(valueDocument) {
        res.render("admin/classdetail", {
          title: "Trang chỉnh sửa lớp học",
          classOne: valueClassOne,
          classTimeList: valueClassTime,
          documentList: valueDocument
        });
      });
    });
  });
};

exports.classDelete = async (req, res) => {
  courseManageAction.classDelete(req.params.classid).then(function(valueClass) {
    res.redirect("/admin/course/edit/" + req.params.courseid);
  });
};

exports.exerciseDelete = async (req, res) => {
  courseManageAction.exerciseDelete(req.params.exerciseid).then(function(valueClass) {
    res.redirect("/admin/course/edit/" + req.params.courseid);
  });
};

exports.questionDelete = async (req, res) => {
  courseManageAction.questionDelete(req.params.id).then(function(valueClass) {
    res.redirect("/admin/exercise/"+ req.params.courseid +"/edit/" + req.params.exerciseid);
  });
};

exports.classTimeDelete = async (req, res) => {
  courseManageAction.classTimeDelete(req.params.id).then(function(valueClass) {
    res.redirect("/admin/class/"+ req.params.courseid +"/edit/" + req.params.classid);
  });
};

exports.slideDelete = async (req, res) => {
  courseManageAction.slideDelete(req.params.id).then(function(valueClass) {
    res.redirect("/admin/"+ req.params.courseid +"/classtime/"+ req.params.classid +"/edit/" + req.params.classslideid);
  });
};

exports.documentDelete = async (req, res) => {
  courseManageAction.documentDelete(req.params.id).then(function(valueClass) {
    res.redirect("/admin/class/"+ req.params.courseid +"/edit/" + req.params.classid);
  });
};

exports.exerciseOne = async (req, res) => {
  courseManageAction.getOneExercise(req.params.exerciseid).then(function(valueExerciseOne) {
    courseManageAction.getAllQuestionOfCourse(req.params.exerciseid).then(function(valueQuestion) {
      res.render("admin/exercisedetail", {
        title: "Trang chỉnh sửa bài tập",
        exerciseOne: valueExerciseOne,
        questionList: valueQuestion
      });
    });
  });
};

exports.classTimeOne = async (req, res) => {
  courseManageAction.getOneClassTime(req.params.id).then(function(valueClassOne) {
    teacherAction.getAllTeacher().then(function(value) {
      courseManageAction.getAllSlideOfClass(req.params.id).then(function(valueSlide) {
        res.render("admin/classtimedetail", {
          title: "Trang chỉnh sửa thời gian học",
          teacherList: value,
          courseId: req.params.courseid,
          classId: req.params.classid,
          classTimeOne: valueClassOne,
          linkRoot: req.headers.host,
          listSlide: valueSlide
        });
      });
    });
  });
};

exports.documentOne = async (req, res) => {
  courseManageAction.getOneDocument(req.params.id).then(function(valueDocument) {
    res.render("admin/documentdetail", {
      title: "Trang chỉnh sửa tài liệu học",
      courseId: req.params.courseid,
      classId: req.params.classid,
      documentOne: valueDocument,
      linkRoot: req.headers.host
    });
  });
};

exports.slideOne = async (req, res) => {
  courseManageAction.getOneSlide(req.params.id).then(function(valueslide) {
    res.render("admin/slidedetail", {
      title: "Trang chỉnh sửa slide bài giảng",
      courseId: req.params.courseid,
      classId: req.params.classid,
      classSlideId: req.params.classslideid,
      slideOne: valueslide,
      linkRoot: req.headers.host
    });
  });
};

exports.questionOne = async (req, res) => {
  courseManageAction.getOneQuestion(req.params.id).then(function(valueQuestion) {
    courseManageAction.getDetailQuestion(req.params.id).then(function(valueDetailQuestion) {
      res.render("admin/questiondetail", {
        title: "Trang chỉnh sửa tài liệu học",
        courseId: req.params.courseid,
        exerciseId: req.params.exerciseid,
        questionOne: valueQuestion,
        detailQuestion: valueDetailQuestion
      });
    });
  });
};

exports.classTimeOneNew = async (req, res) => {
  teacherAction.getAllTeacher().then(function(value) {
    res.render("admin/classtimedetailnew", {
      title: "Trang thêm mới thời gian học",
      teacherList: value,
      courseId: req.params.courseid,
      classId: req.params.classid
    });
  });
};

exports.documentOneNew = async (req, res) => {
  res.render("admin/documentdetailnew", {
    title: "Trang thêm mới tài liệu học",
    courseId: req.params.courseid,
    classId: req.params.classid
  });
};

exports.questionOneNew = async (req, res) => {
  res.render("admin/questiondetailnew", {
    title: "Trang thêm mới câu hỏi",
    courseId: req.params.courseid,
    exerciseId: req.params.exerciseid
  });
};

exports.slideOneNew = async (req, res) => {
  res.render("admin/slidedetailnew", {
    title: "Trang thêm mới slide",
    courseId: req.params.courseid,
    classId: req.params.classid,
    classSlideId: req.params.classslideid
  });
};

exports.saveCourse = async (req, res) => {
  courseManageAction.saveCourse(req.body).then(function(value) {
    res.redirect("/admin/index");
  });
};

exports.saveClass = async (req, res) => {
  courseManageAction.saveClass(req.body).then(function(valueClass) {
    res.redirect("/admin/course/edit/" + req.body.ID_COURSE);
  });
};

exports.saveExercise = async (req, res) => {
  courseManageAction.saveExercise(req.body).then(function(valueClass) {
    res.redirect("/admin/course/edit/" + req.body.ID_COURSE);
  });
};

exports.saveClassTime = async (req, res) => {
  courseManageAction.saveClassTime(req.body).then(function(valueClass) {
    res.redirect("/admin/class/"+ req.body.ID_COURSE +"/edit/" + req.body.ID_CLASS);
  });
};

exports.saveClassTimeSlide = async (req, res) => {

  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {

    var codeDoc = (new Date().getTime());

    var oldpath = files.filetoupload.path;
    var newpath = appRoot + '/public/upload/classtime'+ fields.ID_CLASS_TIME + '_' + codeDoc + "_" + files.filetoupload.name;

    // Read the file
    fs.readFile(oldpath, function (err, data) {

      console.log('File read err: ' + files.filetoupload);

      if (files.filetoupload.name.trim().length == 0) {

        fields.IMAGE_NAME = '';

        courseManageAction.saveClassTimeSlide(fields).then(function(valueClass) {
          res.redirect("/admin/"+ fields.ID_COURSE +"/classtime/"+ fields.ID_CLASS +"/edit/"+ fields.ID_CLASS_TIME +"");
        });

      } else {

        console.log('File read!');

        // Write the file
        fs.writeFile(newpath, data, function (err) {
            if (err) throw err;
            //res.write('File uploaded and moved!');
            //res.end();
            console.log('File written!');

            fields.IMAGE_NAME = 'classtime' + fields.ID_CLASS_TIME + '_' + codeDoc + "_" + files.filetoupload.name;

            courseManageAction.saveClassTimeSlide(fields).then(function(valueClass) {
              res.redirect("/admin/"+ fields.ID_COURSE +"/classtime/"+ fields.ID_CLASS +"/edit/"+ fields.ID_CLASS_TIME +"");
            });
        });

        // Delete the file
        fs.unlink(oldpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
      }
    });
  });
};

exports.saveQuestion = async (req, res) => {
  courseManageAction.saveQuestion(req.body).then(function(valueQuestion) {

    if (req.body.ID == null || req.body.ID.trim().length == 0) {
      courseManageAction.detectLastId().then(function(valueId) {
        courseManageAction.saveDetailQuestion(req.body, valueId['LAST_INSERT_ID()']).then(function(valueDetailQuestion) {
          res.redirect("/admin/exercise/"+ req.body.ID_COURSE +"/edit/" + req.body.ID_EXERCISE);
        });
      });
    } else {
      courseManageAction.saveDetailQuestion(req.body, req.body.ID).then(function(valueDetailQuestion) {
        res.redirect("/admin/exercise/"+ req.body.ID_COURSE +"/edit/" + req.body.ID_EXERCISE);
      });
    }
  });
};

exports.saveDocument = async (req, res) => {

  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {

    var codeDoc = (new Date().getTime());

    var oldpath = files.filetoupload.path;
    var newpath = appRoot + '/public/upload/' + codeDoc + "_" + files.filetoupload.name;

    // Read the file
    fs.readFile(oldpath, function (err, data) {

      console.log('File read err: ' + files.filetoupload);

      if (files.filetoupload.name.trim().length == 0) {

        if(fields.TYPE_DOCUMENT == 0) {
          fields.LINK_FILE = '';
        }

        courseManageAction.saveDocument(fields).then(function(valueDocument) {
          res.redirect("/admin/class/"+ fields.ID_COURSE +"/edit/" + fields.ID_CLASS);
        });

      } else {
        // Write the file
        fs.writeFile(newpath, data, function (err) {
            if (err) throw err;
            //res.write('File uploaded and moved!');
            //res.end();
            console.log('File written!');

            fields.LINK_FILE = codeDoc + "_" + files.filetoupload.name;

            courseManageAction.saveDocument(fields).then(function(valueDocument) {
              res.redirect("/admin/class/"+ fields.ID_COURSE +"/edit/" + fields.ID_CLASS);
            });
        });

        // Delete the file
        fs.unlink(oldpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
      }
    });
  });
};

/////

exports.studentlist = async (req, res) => {
  studentAction.getAllStudent().then(function(value) {
    res.render("admin/student", {
      title: "Trang quản lý học viên",
      listStudent: value
    });
  });
};

exports.studentOneNew = async (req, res) => {
  res.render("admin/studentdetailnew", { title: "Trang thêm mới học viên" });
};

exports.studentOne = async (req, res) => {
  studentAction.getOneStudent(req.params.id).then(function(value) {
    res.render("admin/studentdetail", {
      title: "Trang chỉnh sửa học viên",
      studentOne: value
    });
  });
};

exports.saveStudent = async (req, res) => {
  studentAction.saveStudent(req.body).then(function(value) {
    res.redirect("/admin/student");
  });
};

exports.deleteStudentOne = async (req, res) => {
  studentAction.deleteStudent(req.params.id).then(function(value) {
    res.redirect("/admin/student");
  });
};

exports.teacherOneNew = async (req, res) => {
  res.render("admin/teacherdetailnew", { title: "Trang thêm mới giáo viên" });
};

exports.teacherlist = async (req, res) => {
  teacherAction.getAllTeacher().then(function(value) {
    res.render("admin/teacher", {
      title: "Trang quản lý giáo viên",
      listTeacher: value
    });
  });
};

exports.teacherOne = async (req, res) => {
  studentAction.getOneStudent(req.params.id).then(function(value) {
    res.render("admin/teacherdetail", {
      title: "Trang chỉnh sửa giáo viên",
      teacherOne: value
    });
  });
};

exports.saveTeacher = async (req, res) => {
  studentAction.saveStudent(req.body).then(function(value) {
    res.redirect("/admin/teacher");
  });
};

exports.deleteTeacherOne = async (req, res) => {
  studentAction.deleteStudent(req.params.id).then(function(value) {
    res.redirect("/admin/teacher");
  });
};
