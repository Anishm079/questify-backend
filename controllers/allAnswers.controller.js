const Answer = require("../models/AnswerSchema");

const allAnswer = async (req, res) => {
    const {question_id} = req.params
  try {
    let allAns = await Answer.find({questionId:question_id},{"answer":1,"upvotes":1,"downvotes":1}).populate({path:"user_id",select:"firstname lastname profession avatar followers"}).exec();

    if (allAns.length) {
      allAns = allAns.map(ans => {
        const user = ans.user_id;
        const followersCount = user.followers.length;
        return {
          id:ans._id,
          answer: ans.answer,
          upvotes: ans.upvotes,
          downvotes: ans.downvotes,
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            profession: user.profession,
            avatar: user.avatar,
            followersCount: followersCount
          }
        };
      });
      res.status(200).json(allAns);
    } else {
      res.status(404).json({ error: "No Answers found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error Failed !!!" });
  }
};

module.exports = allAnswer;
