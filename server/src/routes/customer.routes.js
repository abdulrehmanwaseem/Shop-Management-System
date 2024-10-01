import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";

export const customerRouter = new Router();

customerRouter.use(isAuthenticated);

customerRouter.route("/").get(getCustomers).post(createCustomer);
customerRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateCustomer)
  .delete(entryIdValidator(), validateHandler, deleteCustomer);
