import { Router } from "express";
import {
  getMyProfile,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

export const authRouter = Router();

authRouter.route("/signup").post(registerValidator(), validateHandler, signup);

authRouter.route("/login").post(loginValidator(), validateHandler, login);

authRouter.route("/logout").get(logout);

// Protected Routes:
authRouter.get("/me", isAuthenticated, getMyProfile);
