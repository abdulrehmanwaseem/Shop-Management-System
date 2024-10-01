import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";

export const expenseRouter = new Router();

expenseRouter.use(isAuthenticated);
expenseRouter.route("/").get(getExpenses).post(createExpense);
expenseRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateExpense)
  .delete(entryIdValidator(), validateHandler, deleteExpense);
