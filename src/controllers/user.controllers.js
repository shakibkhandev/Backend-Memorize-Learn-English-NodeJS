import bcrypt from "bcryptjs";
import prisma from "../config/prisma.client.js";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/user.schemas.js";
import APIError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAccessAndRefreshToken,
  generateTemporaryCode,
} from "../utils/generate.tokens.js";
import {
  emailVerificationMailgenContent,
  forgetPasswordMailgenContent,
  sendEmail,
} from "../utils/mail.js";

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const parsedBody = signInSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  // Find the user by email from the database
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // Compare the password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
    user.email
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
          },
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User logged in successfully"
      )
    );
});

export const signUp = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const parsedBody = signUpSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  // Check if the email already exists in the database
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new APIError(400, "User already exists");
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const nameParts = name.split(" "); // Split the name into words
  const firstNameInitial = nameParts[0].charAt(0); // Get the first letter of the first word
  const lastNameInitial = nameParts[nameParts.length - 1].charAt(0); // Get the first letter of the last word

  const nameShort = firstNameInitial + lastNameInitial;
  const avatarUrl = `https://placehold.co/600x400?text=${nameShort}`;

  const { temporaryCode, temporaryCodeExpiry } = generateTemporaryCode();

  // Create the new user in the database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
      emailVerificationCode: temporaryCode,
      emailVerificationCodeExpiry: new Date(temporaryCodeExpiry),
    },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  });

  await sendEmail({
    email: newUser?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      newUser.name,
      temporaryCode
    ),
  });

  const user = await prisma.user.findUnique({
    where: { email: newUser.email, id: newUser.id },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  });

  if (!user) {
    throw new APIError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user },
        "Users registered successfully and verification email has been sent on your email."
      )
    );
});

export const signOut = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const parsedBody = forgotPasswordSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }
  // Check if the email already exists in the database
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (!userExists) {
    return res.status(404).send({ message: "User not found" });
  }
  // Generate a new temporary code
  const { temporaryCode, temporaryCodeExpiry } = generateTemporaryCode();
  // Update the user's temporary code and expiry in the database
  await prisma.user.update({
    where: { email },
    data: {
      forgotPasswordCode: temporaryCode,
      forgotPasswordCodeExpiry: new Date(temporaryCodeExpiry),
    },
  });
  // Send the temporary code to the user's email
  await sendEmail({
    email,
    subject: "Reset your password",
    mailgenContent: forgetPasswordMailgenContent(
      userExists.name,
      temporaryCode
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset email has been sent on your email."
      )
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { code, newPassword, confirmPassword } = req.body;

  const parsedBody = resetPasswordSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const user = await prisma.user.findUnique({
    where: { forgotPasswordCode: Number(code) },
  });
  if (!user) {
    return res.status(404).send({ message: "Invalid code" });
  }
  if (user.forgotPasswordCodeExpiry < new Date()) {
    return res.status(400).send({ message: "Code has expired" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      forgotPasswordCode: null,
      forgotPasswordCodeExpiry: null,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});
