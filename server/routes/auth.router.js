import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getUsersById,
  loginUser,
  logout,
  register,
  verifyOtp,
} from "../controllers/auth.controller.js";

export const router = Router();

router.route("/register").post(register);

router.route("/login").post(loginUser);

router.route("/logout").post(authUser, logout);

router.route("/verify-otp").post(verifyOtp);

router.route("/getuser").get(authUser, getUsersById);
