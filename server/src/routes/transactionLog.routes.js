import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getTransactionLogs } from "../controllers/transactionLog.controller.js";

export const transactionLogRouter = new Router();

transactionLogRouter.use(isAuthenticated);
transactionLogRouter.route("/").get(getTransactionLogs);
