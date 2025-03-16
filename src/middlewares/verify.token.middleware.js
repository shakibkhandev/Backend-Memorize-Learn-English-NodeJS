import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userExist = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = userExist; // Assigning decoded token to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export const verifyRole = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN" || role !== "MAINTAINER") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});
