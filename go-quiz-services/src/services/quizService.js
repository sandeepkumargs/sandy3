import quizDb from "../database/quizDb.js";

const getResponseObj = async()=>{
  return {
    "response": [],
    "http_status": 0,
    "status": "OK"
  }
};

const getQuiz = async(userId,technology,proficiency,skill) =>{
  let svcResponse = await getResponseObj();
  try{
    console.log("in service now..");
    const allQuestions = await quizDb.getQuizQuestions();
    console.log("all quest ",allQuestions);
    const randNO = (Math.floor((Math.random()* 100)%allQuestions.length-1)+1);
    console.log("getting all questions ",allQuestions);
    console.log("rand no is ",randNO);
    const question = allQuestions[randNO];
    delete question.answer;
    svcResponse.response = question;
    svcResponse.http_status = 200;
    svcResponse.status = "OK";
    return svcResponse;
  }catch(err){
    svcResponse.response.push("Error : ",err);
    svcResponse.http_status=500,
    svcResponse.status="Err"
  }
};


const evaluateQuiz = async (_id,option) => {
  let svcResponse = await getResponseObj();
  try{
    const evalQuestion = await quizDb.getQuestion(_id);
    if(evalQuestion){
      if(evalQuestion?.answer?.option_number===option?.option_number){
        svcResponse.response = {
          "result":1,
          "answer":evalQuestion.answer
        }
      }else{
        svcResponse.response = {
          "result":0,
          "answer":evalQuestion.answer
        }
      }
        svcResponse.http_status = 200;
        svcResponse.status = "OK";
    }else{
      svcResponse.response.push(`Question not found with id  : ${_id}`);
      svcResponse.http_status=200,
      svcResponse.status="Err"
    }
    return svcResponse;
  }catch(err){
    svcResponse.response.push("Error : ",err);
    svcResponse.http_status=500,
    svcResponse.status="Err"
  }
};

export default {
  evaluateQuiz,
  getQuiz
};