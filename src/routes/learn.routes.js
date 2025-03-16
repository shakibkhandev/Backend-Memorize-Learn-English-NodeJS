import express from "express";
import {
  createExam,
  createIdioms,
  createLesson,
  createMCQ,
  createParagraph,
  createPhrasalVerbs,
  createQuestions,
  createVocabulary,
  getIdioms,
  getLessons,
  getParagraphs,
  getPhrasalVerbs,
  getRandomMCQ,
  getVocabularies,
} from "../controllers/learn.controllers.js";
import { verifyRole } from "../middlewares/verify.token.middleware.js";

const learnRoutes = express.Router();

learnRoutes.post("/learn/permission/create-exam", verifyRole, createExam);
learnRoutes.post("/learn/permission/create-idiom", verifyRole, createIdioms);
learnRoutes.post("/learn/permission/create-lesson", verifyRole, createLesson);
learnRoutes.post("/learn/permission/create-mcq", verifyRole, createMCQ);
learnRoutes.post(
  "/learn/permission/create-question",
  verifyRole,
  createQuestions
);
learnRoutes.post(
  "/learn/permission/create-vocabulary",
  verifyRole,
  createVocabulary
);
learnRoutes.post(
  "/learn/permission/create-phrasal",
  verifyRole,
  createPhrasalVerbs
);
learnRoutes.post(
  "/learn/permission/create-paragraph",
  verifyRole,
  createParagraph
);

learnRoutes.get("/learn/lessons", getLessons);
learnRoutes.get("/learn/random-mcq", getRandomMCQ);
learnRoutes.get("/learn/vocabularies", getVocabularies);
learnRoutes.get("/learn/idioms", getIdioms);
learnRoutes.get("/learn/phrasal-verbs", getPhrasalVerbs);
learnRoutes.get("/learn/paragraphs", getParagraphs);



export default learnRoutes;
