const Question = require("../models/QuestionSchema");
const Answer = require("../models/AnswerSchema");

const getQuestNAns = async (question_id, single, req) => {
  let quest = await Question.findById(question_id, {
    question: 1,
    upvotes: 1,
    downvotes: 1,
    date: 1,
  })
    .populate("user_id", "firstname lastname avatar profession followers")
    .exec();

  quest = {
    id: quest._id,
    question: quest.question,
    upvotes: quest.upvotes,
    downvotes: quest.downvotes,
    date: quest.date,
    user: {
      firstname: quest.user_id.firstname,
      lastname: quest.user_id.lastname,
      avatar: quest.user_id.avatar,
      profession: quest.user_id.profession,
      isfollowing: quest.user_id.followers.includes(req.body.user_id),
      followers: quest.user_id.followers.length,
    },
  };

  if (!single) {
    let answer = await Answer.find(
      { questionId: question_id },
      { answer: 1, downvotes: 1, upvotes: 1, date: 1 }
    )
      .populate("user_id", "firstname lastname avatar profession followers")
      .exec();

    const answerRes = answer.map((ans) => ({
      id: ans._id,
      answer: ans.answer,
      upvotes: ans.upvotes,
      downvotes: ans.downvotes,
      date: ans.date,
      user: {
        firstname: ans.user_id.firstname,
        lastname: ans.user_id.lastname,
        avatar: ans.user_id.avatar,
        profession: ans.user_id.profession,
        isfollowing: ans.user_id.followers.includes(req.body.user_id),
        followers: ans.user_id.followers.length,
      },
    }));

    return { question: { ...quest, answer: answerRes } };
  }else{
    let ans = await Answer.findOne(
        { questionId: question_id },
        { answer: 1, downvotes: 1, upvotes: 1, date: 1 }
      )
        .populate("user_id", "firstname lastname avatar profession followers")
        .exec();
    const answer = {
        id: ans._id,
        answer: ans.answer,
        upvotes: ans.upvotes,
        downvotes: ans.downvotes,
        date: ans.date,
        user: {
          firstname: ans.user_id.firstname,
          lastname: ans.user_id.lastname,
          avatar: ans.user_id.avatar,
          profession: ans.user_id.profession,
          isfollowing: ans.user_id.followers.includes(req.body.user_id),
          followers: ans.user_id.followers.length,
        },
      }
      return { question: { ...quest, answer: answer } };
  }
};

module.exports = getQuestNAns;
