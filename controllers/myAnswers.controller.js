const Answers = require("../models/AnswerSchema");

const myAnswers=async (req,res)=>{
    try{
        const {user_id} = req.body;

        const allAnswers = await Answers.find({user_id:user_id},{"answer":1,"upvotes":1,"downvotes":1,"date":1}).populate("questionId","question").exec();

        res.status(201).json(allAnswers)

    }catch(err){

    }
}

module.exports=myAnswers;