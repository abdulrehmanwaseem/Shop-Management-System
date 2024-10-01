import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";

const handleValidationError = (err) => {
  console.error("Error handling validation error:", err);

  let message = "Validation error occurred";

  const invalidInvocationMatch = err.message.match(
    /Invalid `(.*?)` invocation/
  );
  const argumentMissingMatch = err.message.match(/Argument `(.*?)` is missing/);
  const invalidValueMatch = err.message.match(
    /Argument `(.*?)`: Invalid value provided. Expected (.*?), provided (.*?).$/
  );

  if (invalidInvocationMatch && argumentMissingMatch) {
    const field = argumentMissingMatch[1];
    message = `Invalid value provided for ${field}. Argument is missing.`;
  } else if (invalidInvocationMatch && invalidValueMatch) {
    const field = invalidValueMatch[1];
    const expectedType = invalidValueMatch[2];
    const providedType = invalidValueMatch[3];
    message = `Invalid value provided for ${field}. Expected ${expectedType}, but provided ${providedType}.`;
  }

  return new ApiError(message, 400);
};

const handleUniqueConstraintError = (err) => {
  const target = err.meta?.target;
  const fields = Array.isArray(target) ? target.join(", ") : target;
  const message = `Duplicate field value: ${fields}. Please use another value!`;
  return new ApiError(message, 400);
};

const handleForeignKeyConstraintError = (err) => {
  const message = `Foreign key constraint failed on the field: ${err.meta?.field_name}`;
  return new ApiError(message, 400);
};

const handleRecordNotFoundError = (err) => {
  const message = err.meta?.cause || "Record not found";
  return new ApiError(message, 404);
};

export default (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") err = handleUniqueConstraintError(err);
    if (err.code === "P2003") err = handleForeignKeyConstraintError(err);
    if (err.code === "P2025") err = handleRecordNotFoundError(err);
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    err = handleValidationError(err);
  }

  const response = {
    success: false,
    message: err.message,
  };

  if (process.env.NODE_ENV.trim() === "DEVELOPMENT") {
    response.stack = err.stack;
  }

  return res.status(err.statusCode).json(response);
};
