import bcrypt from "bcryptjs";
import TryCatch from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../config/dbConnection.js";
import { ApiError } from "../utils/ApiError.js";
import { USER_TOKEN, cookieOptions } from "../constants/options.js";

const generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const signup = TryCatch(async (req, res, next) => {
  const { username, name, password } = req.body;

  const userAlreadyExists = await prisma.user.findUnique({
    where: { username },
  });
  if (userAlreadyExists) {
    return next(
      new ApiError(
        "User With This username Already Exists, Try another username",
        400
      )
    );
  }
  const hashedPassword = await bcrypt.hash(password, 8);

  const createdUser = await prisma.user.create({
    data: {
      username,
      name,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  if (!createdUser) {
    return next(new ApiError("Something went wrong while creating user", 500));
  }

  const token = generateJwtToken(createdUser);

  res.status(201).cookie(USER_TOKEN, token, cookieOptions).json({
    status: "success",
    createdUser,
    message: "User Created Succesfully",
  });
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: { username },
  });
  if (!user) {
    return next(
      new ApiError("User Does Not Exists, Try another Username", 400)
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ApiError("Invalid username or password", 400));
  }

  const loggedInUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
    },
  });
  if (!loggedInUser) {
    return next(new ApiError("Something went wrong while logging in", 500));
  }

  const token = generateJwtToken(loggedInUser);

  res.status(200).cookie(USER_TOKEN, token, cookieOptions).json({
    status: "success",
    loggedInUser,
    message: "Logged In Succesfully",
  });
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = req.user;
  res.json({
    status: "success",
    user,
    message: "Profile Fetch Successfully",
  });
});

const logout = TryCatch(async (req, res, next) => {
  res.status(204).clearCookie(USER_TOKEN).json({
    status: "success",
    message: "User Logged out successfully",
  });
});

export { signup, login, logout, getMyProfile };
