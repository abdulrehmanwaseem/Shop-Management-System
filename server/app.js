import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import { corsOptions } from "./src/constants/options.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// * Routes:
import { customerRouter } from "./src/routes/customer.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";

// Error handling imports:
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import { companyRouter } from "./src/routes/company.routes.js";
import { itemRouter } from "./src/routes/item.routes.js";
import { vendorRouter } from "./src/routes/vendor.routes.js";
import { expenseRouter } from "./src/routes/expense.routes.js";
import { invoiceRouter } from "./src/routes/invoice.routes.js";
import { invoiceTypeRouter } from "./src/routes/invoiceType.routes.js";
import { invoicePaymentStatusRouter } from "./src/routes/invoicePaymentStatus.routes.js";
import { dashboardRouter } from "./src/routes/dashboard.routes.js";
import { categoryRouter } from "./src/routes/category.routes.js";
import { fieldRouter } from "./src/routes/field.routes.js";
import { variantRouter } from "./src/routes/variant.routes.js";

//* Setup:
export const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(compression());

// * Routes:
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/invoicesType", invoiceTypeRouter);
app.use("/api/v1/paymentStatus", invoicePaymentStatusRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/fields", fieldRouter);
app.use("/api/v1/variants", variantRouter);

app.use(express.static(join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.use(errorMiddleware);
