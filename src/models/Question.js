const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objSchema = new Schema(
  {
    title: { type: String, required: true, dropDups: true },
    link: String,
    logo: String,
    type: String,
    numOfAnswer: Number,
    status: { type: Number, default: 1 },
    content: String,
    isCorrect: Number,
    detail: String,
    answers: [
        {
            order: Number,
            content: String,
            isCorrect: Boolean,
            detail: String
        }
    ],
    reviewCount: Number,
    star: Number,
    category: { type: String }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model('Question', objSchema);

module.exports = Question;
