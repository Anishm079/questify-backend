const Question = require("../models/QuestionSchema")
const getQuestNAns = require("../utils/getQuestNAns.js")

const getPageQueries = async (req,res) =>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip=(page-1)*limit;

    const questions = await Question.find({},{"_id":1}).sort({date: -1}).skip(skip).limit(limit).exec();

    const countQuestion = await Question.countDocuments();

    let allQuestNAns =  {questions:[]}

    for(let quest of questions){
        let qNa = await getQuestNAns(quest._id,true,req);
        allQuestNAns.questions.push(qNa.question);
    }

    allQuestNAns.questionsCount=countQuestion

    return res.status(201).json(allQuestNAns);

}

module.exports =getPageQueries;