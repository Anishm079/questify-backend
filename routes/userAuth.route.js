const express = require("express");
const router = express.Router()

router.post("/user/login",require("../controllers/login.controller"));//*
router.post("/user/register",require("../controllers/register.controller"));//*
router.post("/refresh_jwt",require("../controllers/refreshJwt.controller"))//*
module.exports=router;