const mysql = require("../../utils/pg");

const getAllQuiz = userId =>
  mysql.get(
    "SELECT b.*, ( SELECT COUNT(*) from ANSWER_STUDENT e where e.EXERCISE_ID = b.ID and STUDENT_MEMBERID = '" +
      userId +
      "') as COUNT from EXERCISE b "
  );
const getQuestion = async id => {
  const data = await mysql.get(
    "SELECT * from QUESTION  where ID_EXERCISE=" + id
  );
  for (i = 0; i < data.length; i++) {
    data[i].answers = await mysql.get(
      "SELECT * from QUESTION_ANSWER  where ID_QUESTION=" +
        data[i].ID +
        " order by INDEX_ANSWER"
    );
  }

  return data;
};

const getchoice = (userId, examId, questionId) =>
  mysql.getOne(
    "select * from ANSWER_STUDENT where STUDENT_MEMBERID=" +
      userId +
      " and EXERCISE_ID=" +
      examId +
      " and ID_QUESTION=" +
      questionId
  );

const saveQuestion = (userId, examId, questionId, index) =>
  mysql.submitQuestion(userId, examId, questionId, index);

const deleteQuestion = (userId, examId) => mysql.deleteQuestion(userId, examId);

const getNumberRight = userId =>
  mysql.getOne(
    `select count(1) RIGHTNUM
    from ANSWER_STUDENT AST
    inner join (
    	select QAN.ID_QUESTION, QAN.INDEX_ANSWER
        from QUESTION_ANSWER QAN
        where QAN.ISRIGHT = 1
    ) A on A.ID_QUESTION = AST.ID_QUESTION
    where A.INDEX_ANSWER = AST.INDEX_ANSWER
    	and AST.STUDENT_MEMBERID = ` + userId);

module.exports = {
  getchoice,
  deleteQuestion,
  saveQuestion,
  getQuestion,
  getAllQuiz,
  getNumberRight
};
