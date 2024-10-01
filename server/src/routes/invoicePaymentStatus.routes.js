import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createInvoicePaymentStatus,
  deleteInvoicePaymentStatus,
  getInvoicesPaymentStatus,
  updateInvoicePaymentStatus,
} from "../controllers/invoicePaymentStatus.controller.js";

export const invoicePaymentStatusRouter = new Router();

invoicePaymentStatusRouter.use(isAuthenticated);

invoicePaymentStatusRouter
  .route("/")
  .get(getInvoicesPaymentStatus)
  .post(createInvoicePaymentStatus);
invoicePaymentStatusRouter
  .route("/:id")
  .put(updateInvoicePaymentStatus)
  .delete(deleteInvoicePaymentStatus);
