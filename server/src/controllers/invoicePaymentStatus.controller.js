import { prisma } from "../config/dbConnection.js";
import { createOne, deleteOne, updateOne } from "../utils/crudFunctions.js";
import TryCatch from "express-async-handler";

const getInvoicesPaymentStatus = TryCatch(async (req, res, next) => {
  const data = await prisma.paymentStatus.findMany({
    orderBy: { id: "desc" },
  });
  res.status(200).json({
    status: "Success",
    data,
  });
});
const createInvoicePaymentStatus = createOne(prisma.paymentStatus);
const updateInvoicePaymentStatus = updateOne(prisma.paymentStatus);
const deleteInvoicePaymentStatus = deleteOne(prisma.paymentStatus);

export {
  getInvoicesPaymentStatus,
  createInvoicePaymentStatus,
  updateInvoicePaymentStatus,
  deleteInvoicePaymentStatus,
};
