import TryCatch from "express-async-handler";
import { prisma } from "../config/dbConnection.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteOne, getAll } from "../utils/crudFunctions.js";

const getInvoices = getAll(
  prisma.invoice,
  {
    invoiceType: {
      select: {
        name: true,
      },
    },
    paymentStatus: {
      select: {
        name: true,
      },
    },
  },
  ["invoiceType", "paymentStatus"]
);

const getInvoiceConfig = TryCatch(async (req, res, next) => {
  const { invoiceType } = req.query;
  let data = [];
  if (invoiceType === "1") {
    data = await prisma.expense.findMany();
  } else if (invoiceType === "2") {
    data = await prisma.vendor.findMany();
  } else if (invoiceType === "3") {
    data = await prisma.customer.findMany();
  } else {
    data = [];
  }

  res.status(201).json({
    status: "Success",
    data,
  });
});

const createInvoice = TryCatch(async (req, res, next) => {
  const { items, ...invoice } = req.body;

  try {
    const transcation = prisma.$transaction(async (prismaClient) => {
      const invoiceTable = await prismaClient.invoice.create({
        data: {
          ...invoice,
          items: JSON.stringify(items),
          date: new Date(invoice.date),
          finalAmount: invoice.amount,
        },
      });

      // Capital Update:
      const capitalAmountUpdate =
        invoice.invoiceTypeId === 3 // 3 = sale and 1, 2 = expense and purchase
          ? { increment: invoiceTable.paidAmount }
          : { decrement: invoiceTable.paidAmount };

      await prismaClient.capital.update({
        where: {
          id: 1,
        },
        data: {
          amount: capitalAmountUpdate,
        },
      });

      // Items Stock Update:
      if (invoice.invoiceTypeId !== 1) {
        const updateStockPromises = items.map((item) => {
          const stockUpdate =
            invoice.invoiceTypeId === 2 // 2 = purchase and 3 = sale
              ? { increment: item.quantity }
              : { decrement: item.quantity };

          return prismaClient.item.update({
            where: { id: item.itemId },
            data: { stock: stockUpdate },
          });
        });

        await Promise.all(updateStockPromises);
      }
      return "Successfully update";
    });
    res.status(201).json({
      status: transcation,
    });
  } catch (error) {
    return next(
      new ApiError(
        "Something went wrong while creating invoice, Try again later"
      )
    );
  }
});

const cancelInvoice = TryCatch(async (req, res, next) => {
  const invoiceId = parseInt(req.params.id);

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (!invoice) {
    return next(new ApiError("No invoice found with that ID", 404));
  }

  prisma.$transaction(async (db) => {
    const capitalAmountUpdate =
      invoice.invoiceTypeId === 3
        ? { decrement: invoice.paidAmount }
        : { increment: invoice.paidAmount };

    await db.capital.update({
      where: {
        id: 1,
      },
      data: {
        amount: capitalAmountUpdate,
      },
    });

    if (invoice.invoiceTypeId !== 1) {
      const restoreStockPromises = JSON.parse(invoice.items).map((item) => {
        const stockUpdate =
          invoice.invoiceTypeId === 2
            ? { decrement: item.quantity }
            : { increment: item.quantity };

        return db.item.update({
          where: { id: item.itemId },
          data: { stock: stockUpdate },
        });
      });

      await Promise.all(restoreStockPromises);
    }

    await db.invoice.update({
      where: { id: invoiceId },
      data: { isCancelled: true },
    });
  });

  res.status(200).json({
    status: "Success",
  });
});

const updateInvoice = TryCatch(async (req, res, next) => {
  const {
    paidAmount,
    amountPaid,
    remainingAmount,
    paymentStatusId,
    invoiceType,
    amount,
  } = req.body;

  const capitalAmountUpdate =
    invoiceType === "Sales"
      ? { increment: amountPaid }
      : { decrement: amountPaid };

  await prisma.capital.update({
    where: {
      id: 1,
    },
    data: {
      amount: capitalAmountUpdate,
    },
  });

  const discount = parseInt(req.body.discount);
  const data = await prisma.invoice.update({
    where: { id: parseInt(req.params.id) },
    data: {
      paidAmount,
      remainingAmount,
      paymentStatusId,
      discount: discount,
      finalAmount: parseInt(amount) - discount,
    },
  });

  if (!data) {
    return next(new ApiError("No Entry found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data,
  });
});

const deleteInvoice = deleteOne(prisma.invoice);

export {
  cancelInvoice,
  createInvoice,
  deleteInvoice,
  getInvoiceConfig,
  getInvoices,
  updateInvoice,
};
