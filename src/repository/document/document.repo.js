const mysql = require('../../utils/pg');

const getDocument = (idcourse, week) =>
  mysql.get(
    `select DOC.ID, DOC.TITLE_DOCUMENT, DOC.LINK_FILE, DOC.TYPE_DOCUMENT,
	     CLA.TITLE_CLASS, CLA.INDEX_WEEK, CLA.IMAGE_CLASS, COU.TOTAL_WEEK,
       DOC.TIME_UPLOAD, COU.ID as COUSE_ID
    from DOCUMENT DOC
    inner join CLASS CLA on DOC.ID_CLASS = CLA.ID
    inner join COURSE COU on COU.ID = CLA.ID_COURSE
    where DOC.STATUS_DOCUMENT = 1 and COU.ID = ` + idcourse + ' and CLA.INDEX_WEEK = ' + week);

module.exports = {
  getDocument
};
