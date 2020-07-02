const express = require("express");

const controller = require("./quiz.controller");

const router = express.Router();

router.get("/", controller.index);
router.get("/detail", controller.detail);
router.get("/result", controller.result);
router.post("/create", controller.create);

module.exports = router;
