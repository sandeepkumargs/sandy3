//User Controller
import toolService from "../services/toolService.js";

const compileRunJava = async (req, res) => {
  const {
    body: { javaSourceCode },
  } = req;
  if (javaSourceCode) {
    const bob = await toolService.compileRunJava(javaSourceCode);
    console.log("bob is ",bob);
    res.status(200).json(bob);
  } else {
    res.status(500).json({
      "status": "Err",
      "response": "No Javacode sent to compile and run..",
      "http_status":500
    });
  }
};

export default {
  compileRunJava,
};
