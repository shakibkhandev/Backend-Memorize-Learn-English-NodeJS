import express from "express";
import {
  forgetPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.post("/auth/sign-in", signIn);
userRoutes.post("/auth/sign-up", signUp);
userRoutes.post("/auth/forget-password", forgetPassword);
userRoutes.post("/auth/reset-password", resetPassword);
userRoutes.post("/auth/sign-out", signOut);

export default userRoutes;
