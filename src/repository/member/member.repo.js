const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../../utils/pg");

const CONSTANTS = require("../../utils/Constants");
const passport = require("passport");
const _ = require("lodash");

const getAll = () => mysql.get("select * from MEMBER");
const findById = id => mysql.getOne("select * from MEMBER where ID = " + id);
const findByEmail = email =>
  mysql.getOne("select * from MEMBER where EMAIL = '" + email + "'");

const create = async (email, name, phone, password) => {
  try {
    const r = await mysql.getOne(
      "SELECT * FROM MEMBER WHERE EMAIL='" + email + "'"
    );
    if (r) {
      return "Tài khoản đã tồn tại !";
    }

    await mysql.update(
      `INSERT INTO MEMBER
  (NAME, EMAIL, PHONE, PASSWORD, ROLE, STATUS)
  VALUES('` +
        name +
        `', '` +
        email +
        `','` +
        phone +
        `', '` +
        password +
        `', '1', 0);
  `
    );
    return "";
  } catch (e) {
    return e.toString();
  }
};

const getSlides = classTimeId =>
  mysql.get(
    `

select * from CLASS_TIMES_SLIDE where ID_CLASS_TIME=` +
      classTimeId +
      ` and STATUS_SLIDE != 99 
order by INDEX_SLIDE Asc`
  );

module.exports = {
  getAll,
  findById,
  findByEmail,
  create,
  getSlides
};
