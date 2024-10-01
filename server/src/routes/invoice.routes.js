import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { invoiceValidator, validateHandler } from "../lib/validators.js";
import {
  createInvoice,
  cancelInvoice,
  deleteInvoice,
  getInvoiceConfig,
  getInvoices,
  updateInvoice,
} from "../controllers/invoice.controller.js";

export const invoiceRouter = new Router();

invoiceRouter.use(isAuthenticated);

// invoiceValidator(), validateHandler,
invoiceRouter.route("/").get(getInvoices).post(createInvoice);
invoiceRouter.route("/config").get(getInvoiceConfig);
invoiceRouter.route("/cancel/:id").put(cancelInvoice);

invoiceRouter.route("/:id").put(updateInvoice).delete(deleteInvoice);
