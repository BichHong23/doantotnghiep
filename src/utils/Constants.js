const HTTP = {
  SUCCESS: 1,
  FAILURE: 0
};

const secretKey = 'NHAT';
const BCRYPT_SALT_ROUNDS = 10;
const STATUS_EXAM = {
  START: 'START',
  STOP: 'STOP',
  SUBMIT: 'SUBMIT',
  CANCLE: 'CANCLE'
};
module.exports.CONSTANTS = {
  HTTP,
  secretKey,
  BCRYPT_SALT_ROUNDS,
  STATUS_EXAM
};
