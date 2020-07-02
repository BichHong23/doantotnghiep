const express = require("express");

const controller = require("./home.controller");

const router = express.Router();

router.get("/", controller.index);
router.get("/detail", controller.detail);
router.get("/class", controller.class);
router.get("/lession", controller.lession);
router.post("/ajaxclassTime", controller.ajaxclassTime);
router.get("/class/:id", controller.classdetail);
router.get("/technical", controller.technical);

module.exports = router;
