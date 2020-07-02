const mysql = require('../../utils/pg');

const getAllTeacher = () => mysql.get('select * from MEMBER where ROLE = 2');

module.exports = {
  getAllTeacher
};
