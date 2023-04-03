const Question = require("../models/QuestionSchema");

const askQuestion = async (req, res, next) => {
  const { question, user_id } = req.body;

  if (!question) {
    return res.status(409).json({ error: "Enter valid question" });
  }

  try {
    const resQuestion = await Question.create({
      question,
      user_id,
      upvotes: 0,
      downvotes: 0,
    });

    if (resQuestion instanceof Question) {
      return res.status(201).json({ success: "question added successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Unexpected error. Question creation failed." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = askQuestion;
