import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/item.controller.js";

export const itemRouter = new Router();

itemRouter.use(isAuthenticated);

itemRouter.route("/").get(getItems).post(createItem);
itemRouter.route("/:id").put(updateItem).delete(deleteItem);
