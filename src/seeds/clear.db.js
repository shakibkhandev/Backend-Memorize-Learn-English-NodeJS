// src/controllers/lessonController.js
import prisma from "../config/prisma.client.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const databaseCleared = asyncHandler(async (req, res) => {
  // Step 1: Clear all data from all tables
  await prisma.userProgress.deleteMany({}); // If UserProgress exists
  await prisma.mCQ.deleteMany({}); // For MCQ table
  await prisma.question.deleteMany({});
  await prisma.vocabulary.deleteMany({});
  await prisma.idiom.deleteMany({});
  await prisma.phrasalVerb.deleteMany({});
  await prisma.paragraph.deleteMany({});
  await prisma.lessons.deleteMany({}); // Lessons last due to foreign keys
  await prisma.user.deleteMany({}); // If User exists

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Database cleared successfully"));
});
