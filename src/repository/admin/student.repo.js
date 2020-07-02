const mysql = require('../../utils/pg');

const getAllStudent = () => mysql.get('select * from MEMBER where ROLE = 1');
const getOneStudent = (idmember) =>
  mysql.getOne('select * from MEMBER where ID = ' + idmember);

const saveStudent = (member) => mysql.updateStudent(member);

const deleteStudent = (idmember) => mysql.deleteStudent(idmember);

module.exports = {
  getAllStudent,
  getOneStudent,
  saveStudent,
  deleteStudent
};
