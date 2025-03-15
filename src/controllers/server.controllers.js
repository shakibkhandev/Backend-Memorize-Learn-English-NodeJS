import asyncHandler from "../utils/asyncHandler.js";

const serverRunning = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});

const healthCheck = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy!",
  });
});

export { healthCheck, serverRunning };
