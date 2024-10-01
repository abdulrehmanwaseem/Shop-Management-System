import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getInvoicesType = getAll(prisma.invoiceType);
const createInvoiceType = createOne(prisma.invoiceType);
const updateInvoiceType = updateOne(prisma.invoiceType);
const deleteInvoiceType = deleteOne(prisma.invoiceType);

export {
  getInvoicesType,
  createInvoiceType,
  updateInvoiceType,
  deleteInvoiceType,
};
