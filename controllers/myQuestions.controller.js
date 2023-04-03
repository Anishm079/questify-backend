const Question = require("../models/QuestionSchema");

const myQuestions = async (req,res)=>{
    try{
        const { user_id } = req.body
        const questions = await Question.find({user_id:user_id},{"question":1,"upvotes":1,"downvotes":1,"date":1})

        return res.status(201).json(questions)
        
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error:"internal server error"})
    }
}

module.exports=myQuestions;