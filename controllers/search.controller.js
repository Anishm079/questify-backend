const filterKeywords = require("../utils/filterKeywords")
const Question  = require("../models/QuestionSchema")
const getQuestNAns = require("../utils/getQuestNAns")

const search = async (req,res) =>{
    const {q} = req.query;
    // console.log(q)
    if(!q) return res.status(404).json({error:"enter valid question"})

    const words = await filterKeywords(q);
    
    const searchQuery = words.join(" ");

    const questions = await Question.find({ $text: { $search: searchQuery } },{"_id":1})

    let allQuestNAns =  {questions:[]}

    for(let quest of questions){
        let qNa = await getQuestNAns(quest._id,true,req);
        allQuestNAns.questions.push(qNa.question);
    }
    
    allQuestNAns.questionsCount=questions.length;

    return res.status(201).json(allQuestNAns);

}

module.exports =search