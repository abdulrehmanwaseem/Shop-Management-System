import { Router } from "express";
import {
  createVendor,
  deleteVendor,
  getVendors,
  updateVendor,
} from "../controllers/vendor.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { entryIdValidator, validateHandler } from "../lib/validators.js";

export const vendorRouter = new Router();

vendorRouter.use(isAuthenticated);

vendorRouter.route("/").get(getVendors).post(createVendor);
vendorRouter
  .route("/:id")
  .put(entryIdValidator(), validateHandler, updateVendor)
  .delete(entryIdValidator(), validateHandler, deleteVendor);
