const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};

const USER_TOKEN = "user_token";

export { cookieOptions, corsOptions, USER_TOKEN };
