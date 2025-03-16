import prisma from "../config/prisma.client.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createLesson = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const lesson = await prisma.lessons.create({
    data: {
      title,
      description,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, lesson, "Lesson created successfully"));
});

export const createVocabulary = asyncHandler(async (req, res) => {
  const { word, meaning, bengaliMeaning, example, lessonId } = req.body;
  const wordData = await prisma.vocabulary.create({
    data: {
      word,
      meaning,
      bengaliMeaning,
      example,
      lessonId,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, wordData, "Word created successfully"));
});

export const createIdioms = asyncHandler(async (req, res) => {
  const { idiom, meaning, example, lessonId } = req.body;
  const idiomData = await prisma.idiom.create({
    data: {
      idiom,
      meaning,
      example,
      lessonId,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, idiomData, "Idiom created successfully"));
});

export const createPhrasalVerbs = asyncHandler(async (req, res) => {
  const { phrasalVerb, meaning, example, lessonId } = req.body;
  const phrasalVerbData = await prisma.phrasalVerb.create({
    data: {
      phrasalVerb,
      meaning,
      example,
      lessonId,
    },
  });
  res
    .status(201)
    .json(
      new ApiResponse(201, phrasalVerbData, "Phrasal Verb created successfully")
    );
});

export const createQuestions = asyncHandler(async (req, res) => {
  const { question, exampleAnswer, lessonId } = req.body;
  const questionData = await prisma.question.create({
    data: {
      question,
      exampleAnswer,
      lessonId,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, questionData, "Question created successfully"));
});

export const createExam = asyncHandler(async (req, res) => {
  const { lessonId } = req.body;
  const examData = await prisma.exam.create({
    data: {
      lessonId,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, examData, "Exam created successfully"));
});

export const createMCQ = asyncHandler(async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  const mcqData = await prisma.mcq.create({
    data: {
      question,
      options,
      correctAnswer,
    },
  });
  res
    .status(201)
    .json(new ApiResponse(201, mcqData, "MCQ created successfully"));
});

export const createParagraph = asyncHandler(async (req, res) => {
  const { title, paragraph, lessonId } = req.body;
  const paragraphData = await prisma.paragraph.create({
    data: {
      title,
      paragraph,
      lessonId,
    },
  });
  res
    .status(201)
    .json(
      new ApiResponse(201, paragraphData, "Paragraph created successfully")
    );
});

export const getLessons = asyncHandler(async (req, res) => {
  const lessons = await prisma.lessons.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, lessons, "Lessons fetched successfully"));
});

export const getVocabularies = asyncHandler(async (req, res) => {
  const vocabularies = await prisma.vocabulary.findMany({
    take: 10,
  });
  res.json(
    new ApiResponse(200, vocabularies, "Vocabularies fetched successfully")
  );
});

export const getVocabularyByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      lessonId,
    },
  });
  res.json(
    new ApiResponse(200, vocabularies, "Vocabularies fetched successfully")
  );
});

export const getIdioms = asyncHandler(async (req, res) => {
  const idioms = await prisma.idiom.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, idioms, "Idioms fetched successfully"));
});

export const getIdiomsByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const idioms = await prisma.idiom.findMany({
    where: {
      lessonId,
    },
  });
  res.json(new ApiResponse(200, idioms, "Idioms fetched successfully"));
});

export const getPhrasalVerbs = asyncHandler(async (req, res) => {
  const phrasalVerbs = await prisma.phrasalVerb.findMany({
    take: 10,
  });
  res.json(
    new ApiResponse(200, phrasalVerbs, "Phrasal Verbs fetched successfully")
  );
});

export const getPhrasalVerbsByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const phrasalVerbs = await prisma.phrasalVerb.findMany({
    where: {
      lessonId,
    },
  });
  res.json(
    new ApiResponse(200, phrasalVerbs, "Phrasal Verbs fetched successfully")
  );
});

export const getLessonById = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const lesson = await prisma.lessons.findUnique({
    where: {
      id: lessonId,
    },
  });
  res.json(new ApiResponse(200, lesson, "Lesson fetched successfully"));
});

export const getQuestions = asyncHandler(async (req, res) => {
  const questions = await prisma.question.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

export const getQuestionsByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const questions = await prisma.question.findMany({
    where: {
      lessonId,
    },
  });
  res.json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

export const getParagraphs = asyncHandler(async (req, res) => {
  const paragraphs = await prisma.paragraph.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, paragraphs, "Paragraphs fetched successfully"));
});

export const getParagraphsByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const paragraphs = await prisma.paragraph.findMany({
    where: {
      lessonId,
    },
  });
  res.json(new ApiResponse(200, paragraphs, "Paragraphs fetched successfully"));
});

export const getExams = asyncHandler(async (req, res) => {
  const exams = await prisma.exam.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

export const getExamsByLesson = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  const exams = await prisma.exam.findMany({
    where: {
      lessonId,
    },
  });
  res.json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

export const getMCQs = asyncHandler(async (req, res) => {
  const mcqs = await prisma.mcq.findMany({
    take: 10,
  });
  res.json(new ApiResponse(200, mcqs, "MCQs fetched successfully"));
});

export const getRandomMCQ = asyncHandler(async (req, res) => {
  const mcqs = await prisma.mCQ.findMany({
    take: 100,
  });
  const randomIndex = Math.floor(Math.random() * mcqs.length);
  res.json(new ApiResponse(200, mcqs[randomIndex], "MCQ fetched successfully"));
});

// export const getAllLessonsData = asyncHandler(async (req, res) => {
//   const lessons = await prisma.lessons.findMany({
//     include: {
//       vocabularies: true,
//       idioms: true,
//       phrasalVerbs: true,
//       paragraph: true,
//       questions: true,
//     },
//   });
//   res.json(new ApiResponse(200, lessons, "Lessons fetched successfully"));
// });
