const express = require("express");

const controller = require("./member.controller");
const router = express.Router();
router.get("/logout", controller.login);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.post("/signin", controller.signin);
module.exports = router;
