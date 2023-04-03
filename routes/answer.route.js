const express = require("express");
const router = express.Router()

router.post("/:question_id/add_answer",require("../controllers/addAnswer.controller"))//*
router.get("/:question_id/all_answers",require("../controllers/allAnswers.controller"))//*
router.put("/:answer_id/upvote",require("../controllers/upvoteAnswer.controller"))//*
router.put("/:answer_id/downvote",require("../controllers/downvoteAnswer.controller"))//*
router.get("/my_answers",require("../controllers/myAnswers.controller"))//*

module.exports=router