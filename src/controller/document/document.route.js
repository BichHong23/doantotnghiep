const express = require("express");

const controller = require("./document.controller");

const router = express.Router();

router.get("/", controller.index);
router.get("/course/:idcourse/week/:week", controller.detail);

module.exports = router;
