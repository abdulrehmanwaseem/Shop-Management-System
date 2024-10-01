import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

export const categoryRouter = new Router();

categoryRouter.use(isAuthenticated);

categoryRouter.route("/").get(getCategories).post(createCategory);
categoryRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateCategory)
  .delete(entryIdValidator(), validateHandler, deleteCategory);
