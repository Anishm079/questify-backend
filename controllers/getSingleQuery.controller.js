const Question = require("../models/QuestionSchema")
const Answer = require("../models/AnswerSchema")
const getQuestNAns = require("../utils/getQuestNAns")

const getSingleQuery = async (req,res) =>{
    try{
        const {question_id}=req.params;
        if(!question_id) return res.status(404).json({error:"question not found"});

        const result = await getQuestNAns(question_id,req);

        return res.send(result);
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error!!!"})
    }
}

module.exports = getSingleQuery;