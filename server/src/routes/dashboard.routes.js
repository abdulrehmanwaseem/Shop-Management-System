import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getDashboardData,
  getDashboardTablesData,
} from "../controllers/dashboard.controller.js";

export const dashboardRouter = new Router();

dashboardRouter.use(isAuthenticated);

dashboardRouter.route("/").post(getDashboardData);
dashboardRouter.route("/tables").post(getDashboardTablesData);
