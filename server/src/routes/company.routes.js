import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";

export const companyRouter = new Router();

companyRouter.use(isAuthenticated);

companyRouter.route("/").get(getCompanies).post(createCompany);
companyRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateCompany)
  .delete(entryIdValidator(), validateHandler, deleteCompany);
