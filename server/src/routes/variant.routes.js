import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";
import {
  createVariant,
  deleteVariant,
  getVariants,
  updateVariant,
} from "../controllers/variant.controller.js";

export const variantRouter = new Router();

variantRouter.use(isAuthenticated);

variantRouter.route("/").get(getVariants).post(createVariant);
variantRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateVariant)
  .delete(entryIdValidator(), validateHandler, deleteVariant);
