import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import quizRouter from "./v1/routes/quizRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    "booooooooooooo...Go-Ac-Quiz-Microservice..Thought of the day - The only failure is not trying..",
  );
});

app.use("/api/v1/quiz", quizRouter);

app.listen(process.env.PORT, () => {
  console.log("Go-Ac-Quiz-Microservice listening on ", process.env.PORT);
});
