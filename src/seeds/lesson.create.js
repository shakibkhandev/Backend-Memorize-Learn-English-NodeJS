import prisma from "../config/prisma.client.js";
import { lessonsData } from "../data/lesson.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createLessonSeed = asyncHandler(async (req, res) => {
  const lessonDatas = lessonsData;
  
  let lessonsHistory = [];
  for (const lesson of lessonDatas) {
    const createdLesson = await prisma.lessons.create({
      data: {
        title: lesson.title,
        description: lesson.description,
        questions: {
          create: lesson.questions,
        },
        vocabularies: {
          create: lesson.vocabularies,
        },
        idioms: {
          create: lesson.idioms,
        },
        phrasalVerbs: {
          create: lesson.phrasalVerbs,
        },
        paragraph: {
          // Assuming singular per your schema; change to `paragraphs` if plural
          create: lesson.paragraphs,
        },
      },
    });
    lessonsHistory.push(createdLesson);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, lessonsHistory, "Lessons created successfully"));
});
