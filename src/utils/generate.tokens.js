import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client.js";
import { USER_TEMPORARY_CODE_EXPIRY } from "../constants/index.js";
import ApiError from "./ApiError.js";

function generateRandomCode() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate temporary token
export function generateTemporaryCode() {
  const temporaryCode = generateRandomCode();

  // This is the expiry time for the token (20 minutes)
  const temporaryCodeExpiry = Date.now() + USER_TEMPORARY_CODE_EXPIRY;

  return { temporaryCodeExpiry, temporaryCode };
}

function generateAccessToken(userId, userEmail) {
  return jwt.sign(
    { id: userId, email: userEmail },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
}

export async function generateAccessAndRefreshToken(userId, userEmail) {
  try {
    const accessToken = generateAccessToken(userId, userEmail);
    const refreshToken = generateRefreshToken(userId, userEmail);
    
    
    // Store refresh token in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
}

// Helper function to generate JWT token
export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
