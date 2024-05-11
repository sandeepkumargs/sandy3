import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import toolRouter from "./v1/routes/toolRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(
    " i have done succesfully completed deploying to ecr, Thought of the day - The only failure is not trying..",
  );
});

app.use("/api/v1/tools", toolRouter);

app.listen(process.env.PORT, () => {
  console.log("Go-Ac-Tools-Microservice listening on ", process.env.PORT);
});
