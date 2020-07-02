const express = require('express');

const controller = require('./question.controller');

const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.search);
router.get('/create', controller.createGet);
router.post('/create', controller.createPost);
router.get('/edit', controller.editGet);


module.exports = router;

