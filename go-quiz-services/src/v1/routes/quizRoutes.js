import express from "express";
import quizController from "../../controllers/quizController.js";
const quizRouter = express.Router();

quizRouter.get("/simplequiz/get", quizController.getQuiz);
quizRouter.post("/simplequiz/evaluate", quizController.evaluateQuiz);

export default quizRouter;
