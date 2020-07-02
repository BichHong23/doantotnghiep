const mysql = require('../../utils/pg');

const getAllCourseManage = () => mysql.get('select * from COURSE where STATUS_COURSE != 99');
const saveCourse = courseInput => mysql.saveCourse(courseInput);
const getOneCourse = id => mysql.getOne('select * from COURSE where ID = ' + id);
const getAllClassOfCourse = courseid =>
  mysql.get('select * from CLASS where STATUS_CLASS != 99 and ID_COURSE = '+ courseid +' order by INDEX_WEEK');

const saveClass = classInput => mysql.saveClass(classInput);
const getOneClass = classid => mysql.getOne('select * from CLASS where ID = ' + classid);
const getAllClassTimeOfClass = classid => mysql.get(
    `select CT.*, T.NAME NAMEGV
    from CLASS_TIMES CT
    inner join MEMBER T on CT.TEACHER_MEMBERID = T.ID
    where CT.STATUS_CLASS_TIMES != 99 and CT.ID_CLASS = `+ classid +`
    order by CT.TIME_START`);

const saveClassTime = classTimeInput => mysql.saveClassTime(classTimeInput);
const getOneClassTime = classtimeid => mysql.getOne(
  'select * from CLASS_TIMES where ID = ' + classtimeid);

const getAllDocumentOfCourse = classid =>
  mysql.get('select * from DOCUMENT where STATUS_DOCUMENT != 99 and ID_CLASS = '+ classid +' order by TIME_UPLOAD');

const saveDocument = documentInput => mysql.saveDocument(documentInput);
const getOneDocument = documentid => mysql.getOne(
  'select * from DOCUMENT where ID = ' + documentid);

const saveExercise = exerciseInput => mysql.saveExercise(exerciseInput);
const getAllExerciseOfCourse = courseid =>
  mysql.get('select * from EXERCISE where STATUS_EXERCISE != 99 and ID_COURSE = '+ courseid +' order by DEADLINE');

const getOneExercise = exerciseid => mysql.getOne('select * from EXERCISE where ID = ' + exerciseid);
const getAllQuestionOfCourse = exerciseid =>
  mysql.get('select * from QUESTION where STATUS_QUESTION != 99 and ID_EXERCISE = '+ exerciseid +' order by INDEX_QUESTION');

const saveQuestion = questionInput => mysql.saveQuestion(questionInput);
const saveDetailQuestion = (questionInput, newId) => mysql.saveDetailQuestion(questionInput, newId);

const getOneQuestion = questionid => mysql.getOne('select * from QUESTION where ID = '+ questionid);
const getDetailQuestion = questionid => mysql.get(
  'select * from QUESTION_ANSWER where ID_QUESTION = '+ questionid + ' order by INDEX_ANSWER');

const detectLastId = () => mysql.getOne('SELECT LAST_INSERT_ID();');

const courseDelete = courseId => mysql.getOne('update COURSE set STATUS_COURSE = 99 where ID = ' + courseId);
const classDelete = classId => mysql.getOne('update CLASS set STATUS_CLASS = 99 where ID = ' + classId);
const classTimeDelete = classtimeid => mysql.getOne(
  'update CLASS_TIMES set STATUS_CLASS_TIMES = 99 where ID = ' + classtimeid);

const documentDelete = documentid => mysql.getOne(
  'update DOCUMENT set STATUS_DOCUMENT = 99 where ID = ' + documentid);

const exerciseDelete = exerciseid => mysql.getOne(
  'update EXERCISE set STATUS_EXERCISE = 99 where ID = ' + exerciseid);

const questionDelete = questionid => mysql.getOne(
  'update QUESTION set STATUS_QUESTION = 99 where ID = ' + questionid);

const getAllSlideOfClass = classtimeid => mysql.get(
  'select * from CLASS_TIMES_SLIDE where STATUS_SLIDE != 99 and ID_CLASS_TIME = '+ classtimeid + ' order by INDEX_SLIDE');

const getOneSlide = classtimeslideid => mysql.getOne('select * from CLASS_TIMES_SLIDE where ID = ' + classtimeslideid);
const saveClassTimeSlide = classTimeSlideInput => mysql.saveClassTimeSlide(classTimeSlideInput);
const slideDelete = classtimeslideid =>
  mysql.getOne('update CLASS_TIMES_SLIDE set STATUS_SLIDE = 99 where ID = ' + classtimeslideid);

module.exports = {
  getAllCourseManage,
  saveCourse,
  getOneCourse,
  getAllClassOfCourse,
  saveClass,
  getOneClass,
  getAllClassTimeOfClass,
  saveClassTime,
  getOneClassTime,
  getAllDocumentOfCourse,
  saveDocument,
  getOneDocument,
  saveExercise,
  getAllExerciseOfCourse,
  getOneExercise,
  getAllQuestionOfCourse,
  saveQuestion,
  detectLastId,
  saveDetailQuestion,
  getOneQuestion,
  getDetailQuestion,
  courseDelete,
  classDelete,
  classTimeDelete,
  documentDelete,
  getAllSlideOfClass,
  saveClassTimeSlide,
  getOneSlide,
  slideDelete,
  exerciseDelete,
  questionDelete
};
