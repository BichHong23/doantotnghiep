const mysql = require("../../utils/pg");

const getAll = () => mysql.get("select * from COURSE where STATUS_COURSE = 1");
const getOneCourse = idcourse =>
  mysql.getOne(
    "select * from COURSE where STATUS_COURSE = 1 and ID = " + idcourse
  );

const getClassByType = (classId, type) =>
  mysql.get(
    `
SELECT ID, ID_COURSE, TYPE_CLASS, DESCRIPTION_CLASS, IMAGE_CLASS, INDEX_WEEK, TITLE_CLASS, DATE_STUDY
FROM CLASS where STATUS_CLASS = 1 and ID_COURSE = ` +
      classId +
      ` and TYPE_CLASS = ` +
      type
  );

const getClassTime = classId =>
  mysql.get("select * from CLASS_TIMES where STATUS_CLASS_TIMES = 1 and ID_CLASS=" + classId);

module.exports = {
  getClassTime,
  getClassByType,
  getAll,
  getOneCourse
};
