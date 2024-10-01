import jwt from "jsonwebtoken";
import { USER_TOKEN } from "../constants/options.js";
import { promisify } from "util";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../config/dbConnection.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies[USER_TOKEN];
  if (!token || token === undefined) {
    return next(new ApiError("UnAuthorized!", 401));
  }
  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
    });
    if (!currentUser) {
      return next(
        new ApiError(
          "The User belonging to this session, no longer exists",
          404
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(
      new ApiError("User Authentication failed. Please log in again.", 400)
    );
  }
};

export default isAuthenticated;
