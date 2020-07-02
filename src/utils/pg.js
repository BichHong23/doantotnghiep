var mysql = require("mysql");

var pool = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "db_nhom22_doantn",
  acquireTimeout: 1000000
});

pool.connect();

// pool.on("acquire", function(connection) {
//   console.log("Connection %d acquired", connection.threadId);
// });

// pool.on("connection", function(connection) {
//   connection.query("SET SESSION auto_increment_increment=1");
// });

const get = query => new Promise((resolve, reject) => {
  pool.query(query, function(error, results, fields) {
    if (error)
      reject(error);
    else
      resolve(results);
    }
  );
});

const update = query => new Promise((resolve, reject) => {
  pool.query(query, function(error, results, fields) {
    if (error)
      reject(error);
    resolve(results);
  });
});

const getOne = query => new Promise((resolve, reject) => {
  // console.log(query);
  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const updateStudent = member => new Promise((resolve, reject) => {
  var query = "";

  if (member.ID == null || member.ID.trim().length == 0) {
    query = `INSERT INTO MEMBER
        (NAME, EMAIL, PHONE, PASSWORD, ROLE, STATUS)
        VALUES
        ('` + member.NAME + `', '` + member.EMAIL + `', '` + member.PHONE + `',
        '` + member.PASSWORD + `', '` + member.ROLE + `', '` + member.STATUS + `');`;
  } else {
    var upPass = "";

    if (member.PASSWORD != null && member.PASSWORD.trim().length > 0) {
      upPass = ` PASSWORD = '` + member.PASSWORD + `', `;
    }

    query = `UPDATE MEMBER
        SET NAME = '` + member.NAME + `', EMAIL = '` + member.EMAIL + `', ` + upPass + `
          PHONE = '` + member.PHONE + `', ROLE = '` + member.ROLE + `', STATUS = '` + member.STATUS + `'
        WHERE ID = '` + member.ID + `';`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const deleteStudent = idmember => new Promise((resolve, reject) => {
  var query = `DELETE FROM MEMBER WHERE ID = '` + idmember + `';`;
  console.log("1 deleting +" + query);

  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveCourse = courseInput => new Promise((resolve, reject) => {
  var query = "";

  if (courseInput.ID == null || courseInput.ID.trim().length == 0) {
    query = `INSERT INTO COURSE
        (TITLE_COURSE, DESCRIPTION_COURSE, STATUS_COURSE, IMAGE_COURSE, TOTAL_WEEK, START_DAY)
        VALUES
        ('` + courseInput.TITLE_COURSE + `', '` + courseInput.DESCRIPTION_COURSE + `',
          '` + courseInput.STATUS_COURSE + `', '` + courseInput.IMAGE_COURSE + `',
          '` + courseInput.TOTAL_WEEK + `', '` + courseInput.START_DAY + `');`;
  } else {
    query = `UPDATE COURSE SET
        TITLE_COURSE = '` + courseInput.TITLE_COURSE + `',
          DESCRIPTION_COURSE = '` + courseInput.DESCRIPTION_COURSE + `',
          STATUS_COURSE = '` + courseInput.STATUS_COURSE + `',
          IMAGE_COURSE = '` + courseInput.IMAGE_COURSE + `',
          TOTAL_WEEK = '` + courseInput.TOTAL_WEEK + `',
          START_DAY = '` + courseInput.START_DAY + `'
        WHERE ID = ` + courseInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveClass = classInput => new Promise((resolve, reject) => {
  var query = "";

  if (classInput.ID == null || classInput.ID.trim().length == 0) {
    query = `INSERT INTO CLASS
          (ID_COURSE, TYPE_CLASS, DESCRIPTION_CLASS, IMAGE_CLASS, INDEX_WEEK, TITLE_CLASS, DATE_STUDY)
          VALUES
          ('` + classInput.ID_COURSE + `', '` + classInput.TYPE_CLASS + `',
            '` + classInput.DESCRIPTION_CLASS + `', '` + classInput.IMAGE_CLASS + `',
            '` + classInput.INDEX_WEEK + `', '` + classInput.TITLE_CLASS + `',
            '` + classInput.DATE_STUDY + `');`;
  } else {
    query = `UPDATE CLASS SET
            TYPE_CLASS = '` + classInput.TYPE_CLASS + `',
            DESCRIPTION_CLASS = '` + classInput.DESCRIPTION_CLASS + `',
            IMAGE_CLASS = '` + classInput.IMAGE_CLASS + `',
            INDEX_WEEK = '` + classInput.INDEX_WEEK + `',
            TITLE_CLASS = '` + classInput.TITLE_CLASS + `',
            DATE_STUDY = '` + classInput.DATE_STUDY + `'
          WHERE ID = ` + classInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveClassTime = classTimeInput => new Promise((resolve, reject) => {
  var query = "";

  if (classTimeInput.ID == null || classTimeInput.ID.trim().length == 0) {
    query = `INSERT INTO CLASS_TIMES
          (ID_CLASS, TIME_START, MINUTES_STUDY, TEACHER_MEMBERID)
          VALUES
          ('` + classTimeInput.ID_CLASS + `', '` + classTimeInput.TIME_START + `',
            '` + classTimeInput.MINUTES_STUDY + `', '` + classTimeInput.TEACHER_MEMBERID + `');`;
  } else {
    query = `UPDATE CLASS_TIMES SET
            ID_CLASS = '` + classTimeInput.ID_CLASS + `',
            TIME_START = '` + classTimeInput.TIME_START + `',
            MINUTES_STUDY = '` + classTimeInput.MINUTES_STUDY + `',
            TEACHER_MEMBERID = '` + classTimeInput.TEACHER_MEMBERID + `'
          WHERE ID = ` + classTimeInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveDocument = documentInput => new Promise((resolve, reject) => {
  var query = "";

  if (documentInput.ID == null || documentInput.ID.trim().length == 0) {
    query = `INSERT INTO DOCUMENT
          (TITLE_DOCUMENT, LINK_FILE, TYPE_DOCUMENT, TIME_UPLOAD, ID_CLASS)
          VALUES
          ('` + documentInput.TITLE_DOCUMENT + `', '` + documentInput.LINK_FILE + `',
            '` + documentInput.TYPE_DOCUMENT + `', CURDATE(), '` + documentInput.ID_CLASS + `');`;
  } else {
    query = `UPDATE DOCUMENT SET
            TITLE_DOCUMENT = '` + documentInput.TITLE_DOCUMENT + `',
            LINK_FILE = '` + documentInput.LINK_FILE + `',
            TYPE_DOCUMENT = '` + documentInput.TYPE_DOCUMENT + `',
            TIME_UPLOAD = CURDATE(),
            ID_CLASS = '` + documentInput.ID_CLASS + `'
          WHERE ID = ` + documentInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveExercise = exerciseInput => new Promise((resolve, reject) => {
  var query = "";

  if (exerciseInput.ID == null || exerciseInput.ID.trim().length == 0) {
    query = `INSERT INTO EXERCISE
          (ID_COURSE, TITLE_EXERCISE, STATUS_EXERCISE, DESCRIPTION_EXERCISE,
            IMAGE_EXERCISE, DEADLINE)
          VALUES
          ('` + exerciseInput.ID_COURSE + `', '` + exerciseInput.TITLE_EXERCISE + `',
            '` + exerciseInput.STATUS_EXERCISE + `', '` + exerciseInput.DESCRIPTION_EXERCISE + `',
            '` + exerciseInput.IMAGE_EXERCISE + `', '` + exerciseInput.DEADLINE + `');`;
  } else {
    query = `UPDATE EXERCISE SET
            ID_COURSE = '` + exerciseInput.ID_COURSE + `',
            TITLE_EXERCISE = '` + exerciseInput.TITLE_EXERCISE + `',
            STATUS_EXERCISE = '` + exerciseInput.STATUS_EXERCISE + `',
            DESCRIPTION_EXERCISE = '` + exerciseInput.DESCRIPTION_EXERCISE + `',
            IMAGE_EXERCISE = '` + exerciseInput.IMAGE_EXERCISE + `',
            DEADLINE = '` + exerciseInput.DEADLINE + `'
          WHERE ID = ` + exerciseInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveQuestion = questionInput => new Promise((resolve, reject) => {
  var query = "";

  if (questionInput.ID == null || questionInput.ID.trim().length == 0) {
    query = `INSERT INTO QUESTION
          (ID_EXERCISE, INDEX_QUESTION, CONTENT)
          VALUES
          ('` + questionInput.ID_EXERCISE + `', '` + questionInput.INDEX_QUESTION + `',
            '` + questionInput.CONTENT + `');`;
  } else {
    query = `UPDATE QUESTION SET
            ID_EXERCISE = '` + questionInput.ID_EXERCISE + `',
            INDEX_QUESTION = '` + questionInput.INDEX_QUESTION + `',
            CONTENT = '` + questionInput.CONTENT + `'
          WHERE ID = ` + questionInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveClassTimeSlide = classTimeSlideInput => new Promise((resolve, reject) => {

  var query = "";

  if (classTimeSlideInput.ID == null || classTimeSlideInput.ID.trim().length == 0) {
    query = `INSERT INTO CLASS_TIMES_SLIDE
          (ID_CLASS_TIME, IMAGE_NAME, INDEX_SLIDE, STATUS_SLIDE)
          VALUES
          ('` + classTimeSlideInput.ID_CLASS_TIME + `', '` + classTimeSlideInput.IMAGE_NAME + `',
            '` + classTimeSlideInput.INDEX_SLIDE + `', 1);`;
  } else {

    var sqlName = "";

    if(classTimeSlideInput.IMAGE_NAME.trim().length > 0) {
      sqlName = ` IMAGE_NAME = '`+ classTimeSlideInput.IMAGE_NAME +`', `;
    }

    query = `UPDATE CLASS_TIMES_SLIDE SET
            ID_CLASS_TIME = '` + classTimeSlideInput.ID_CLASS_TIME + `',
            `+ sqlName +`
            INDEX_SLIDE = '` + classTimeSlideInput.INDEX_SLIDE + `'
          WHERE ID = ` + classTimeSlideInput.ID + `;`;
  }

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const saveDetailQuestion = (questionInput, newId) => new Promise((resolve, reject) => {
  var query = "delete from QUESTION_ANSWER where ID_QUESTION = " + newId + ";";

  pool.query(query, function(error, results, fields) {
    if (error) {

      console.log(error);
      reject(error);

    } else {

      var lengthAnswer = questionInput.ANSWER.toString().split(",");

      for (var index = 0; index < lengthAnswer.length; index++) {
        if (index == questionInput.CAUDUNG) {
          ISRIGHT = 1;
        } else {
          ISRIGHT = 0;
        }

        query = ` INSERT INTO QUESTION_ANSWER (ID_QUESTION, INDEX_ANSWER, CONTENT, ISRIGHT)
          VALUES ('` + newId + `', '` + index + `', '` + lengthAnswer[index] + `', '` + ISRIGHT + `');`;

        pool.query(query, function(error, results, fields) {
          if (error) {
            console.log(error);
            reject(error);
          }
        });
      }

      resolve(results[0]);
    }
  });
});

// pool.on("release", function(connection) {
//    console.log("Connection %d released", connection.threadId);
// });

// pool.on("error", function(err) {
//   console.log("[mysql error]", err);
// });

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

const submitQuestion = (userId, examId, questionId, index) => new Promise((resolve, reject) => {
  const query = ` INSERT INTO ANSWER_STUDENT (STUDENT_MEMBERID, INDEX_ANSWER, ID_QUESTION,EXERCISE_ID)
    VALUES ('` + userId + `', '` + index + `', '` + questionId + `', '` + examId + `');`;

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

const deleteQuestion = (userId, examId) => new Promise((resolve, reject) => {
  var query = "delete from ANSWER_STUDENT where EXERCISE_ID=" + examId + " AND STUDENT_MEMBERID = " + userId + ";";

  pool.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      resolve(results[0]);
    }
  });
});

exports.get = get;
exports.getOne = getOne;

exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;

exports.saveCourse = saveCourse;

exports.saveClass = saveClass;
exports.deleteQuestion = deleteQuestion;
exports.saveClassTime = saveClassTime;

exports.saveDocument = saveDocument;

exports.saveExercise = saveExercise;

exports.saveQuestion = saveQuestion;

exports.submitQuestion = submitQuestion;

exports.saveDetailQuestion = saveDetailQuestion;

exports.saveClassTimeSlide = saveClassTimeSlide;

exports.update = update;
