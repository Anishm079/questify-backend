const filterKeywords = require("../utils/filterKeywords")
const Question  = require("../models/QuestionSchema")

const recommendedQuestions=async (req,res)=>{
    const {question_text} = req.params;
    if(!question_text) return res.status(404).json({error:"select a vaild question"});

    if(!question_text) return res.status(404).json({error:"enter valid question"})

    const words = await filterKeywords(question_text);
    
    const searchQuery = words.join(" ");


    const questions = await Question.find({ $text: { $search: searchQuery } },{"_id":1,"question":1})

    return res.status(201).json(questions);
}

module.exports=recommendedQuestions;