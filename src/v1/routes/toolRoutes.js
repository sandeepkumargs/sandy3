//routes for users endpoint
import express from "express";
import toolController from "../../controllers/toolController.js";
const toolRouter = express.Router();

toolRouter.post("/compilerun/java", toolController.compileRunJava);

// toolRouter.get("/master",userController.getMaster);
// toolRouter.get("/hierarchy",userController.getHierarchyMaster);
// toolRouter.get("/:empId",userController.getUser);

// toolRouter.post("/password",userController.setPassword);
// toolRouter.post("/:empId",userController.updateUser);
// toolRouter.post("/education/:empId",userController.updateEducation);
// toolRouter.post("/experience/:empId",userController.updateExperience);
// toolRouter.post("/certificates/:empId",userController.updateCertificates);

export default toolRouter;
