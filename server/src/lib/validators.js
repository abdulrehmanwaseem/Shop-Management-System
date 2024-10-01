import { body, param, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(", ");

    return next(new ApiError(errorMessages, 400));
  }
  return next();
};

const registerValidator = () => [
  body("name").notEmpty().withMessage("Please Enter Name"),
  body("username").notEmpty().withMessage("Please Enter Username"),
  body("password")
    .notEmpty()
    .withMessage("Please Enter Password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];

const loginValidator = () => [
  body("username").notEmpty().withMessage("Please Enter Username"),
  body("password").notEmpty().withMessage("Please Enter Password"),
];

const entryIdValidator = () => [param("id", "Please Enter ID").notEmpty()];

const invoiceValidator = () => [
  body("name")
    .notEmpty()
    .isString("This field should be a string value")
    .withMessage("Please enter invoice name"),
  body("invoiceType")
    .notEmpty()
    .isString("This field should be a string value")
    .withMessage("Please enter invoice type"),
  body("amount")
    .notEmpty()
    .isNumeric("This field should be a numeric value")
    .withMessage("Please enter invoice amount"),
  body("paymentStatus")
    .notEmpty()
    .isString("This field should be a string value")
    .withMessage("Please enter invoice payment status"),
  body("paidAmount")
    .notEmpty()
    .isNumeric("This field should be a numeric value")
    .withMessage("Please enter invoice paid amount"),
  body("particular")
    .notEmpty()
    .isString("This field should be a string value")
    .withMessage("Please enter invoice particular"),
  body("date").notEmpty().withMessage("Please enter invoice date"),
  body("isCancelled")
    .notEmpty()
    .isBoolean("This field should be true or false")
    .withMessage("Please enter invoice isCancelled"),
];

export {
  validateHandler,
  registerValidator,
  loginValidator,
  entryIdValidator,
  invoiceValidator,
};
