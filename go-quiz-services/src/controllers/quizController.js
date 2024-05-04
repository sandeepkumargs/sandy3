//User Controller
import quizService from "../services/quizService.js";

const getQuiz = async(req,res) =>{
  try {
    console.log("getting quiz..");
    const{
      param:{userId,technology,proficiency,skill}
    } = req;
    console.log("bob");
    const quizQuestion = await quizService.getQuiz(userId,technology,proficiency,skill);
    res.status(200).json(quizQuestion);
  } catch (err) {
    console.log("Error in getQuiz Controller ", err);
    res.status(200).json("Error");
  }
};

const evaluateQuiz = async (req, res) => {
  const {
    body: { question_id,option }
  } = req;
  if (question_id) {
    const result = await quizService.evaluateQuiz(question_id,option);
    res.status(200).json(result);
  } else {
    res.status(500).json({
      "status": "Err",
      "response": "No Javacode sent to compile and run..",
      "http_status":500
    });
  }
};
export default {
  getQuiz,
  evaluateQuiz
};
