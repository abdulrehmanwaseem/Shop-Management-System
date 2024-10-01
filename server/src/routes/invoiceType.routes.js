import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createInvoiceType,
  deleteInvoiceType,
  getInvoicesType,
  updateInvoiceType,
} from "../controllers/invoiceType.controller.js";

export const invoiceTypeRouter = new Router();

invoiceTypeRouter.use(isAuthenticated);

invoiceTypeRouter.route("/").get(getInvoicesType).post(createInvoiceType);
invoiceTypeRouter
  .route("/:id")
  .put(updateInvoiceType)
  .delete(deleteInvoiceType);
