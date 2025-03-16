import prisma from "../config/prisma.client.js";
import { MCQs } from "../data/data.mcq.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createMCQSeed = asyncHandler(async (req, res) => {
  let history = [];
  for (const mcq of MCQs) {
    const newMcq = await prisma.mCQ.create({
      data: mcq,
    });
    history.push(newMcq);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, history, "MCQs created successfully"));
});
