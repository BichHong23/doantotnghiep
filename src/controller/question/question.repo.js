const mongoose = require('mongoose');

const Question = mongoose.model('Question');


const _ = require('lodash');

const getAll = () => Question.find({});

const getById = (id) => Question.findOne({ _id : mongoose.Types.ObjectId(id) });

const save = (data) => Question.create(data);

const update = (data) => Question.updateOne(data);


module.exports = {
    getAll,
    save,
    
    getById,
    update
 };

