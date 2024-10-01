import { Router } from "express";
import {
  createField,
  deleteField,
  getFields,
  updateField,
} from "../controllers/field.controller.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

export const fieldRouter = new Router();

fieldRouter.use(isAuthenticated);

fieldRouter.route("/").get(getFields).post(createField);
fieldRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateField)
  .delete(entryIdValidator(), validateHandler, deleteField);
