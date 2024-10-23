import TryCatch from "express-async-handler";
import { prisma } from "../config/dbConnection.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteOne, getAll } from "../utils/crudFunctions.js";

const getInvoices = getAll(
  prisma.invoice,
  {
    party: {
      select: {
        name: true,
      },
    },
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
  ["invoiceType", "paymentStatus", "party"]
);

const getInvoiceConfig = TryCatch(async (req, res, next) => {
  const { invoiceType } = req.query;
  let data = [];
  if (invoiceType === "1") {
    data = await prisma.party.findMany({
      where: {
        type: "EXPENSE",
      },
      select: {
        id: true,
        name: true,
      },
    });
  } else if (invoiceType === "2") {
    data = await prisma.party.findMany({
      where: {
        type: "VENDOR",
      },
      select: {
        id: true,
        name: true,
      },
    });
  } else if (invoiceType === "3") {
    data = await prisma.party.findMany({
      where: {
        type: "CUSTOMER",
      },
      select: {
        id: true,
        name: true,
      },
    });
  } else if (invoiceType === "logs") {
    data = await prisma.party.findMany({
      where: {
        type: {
          not: "EXPENSE",
        },
      },
      select: {
        name: true,
      },
    });
  }
  res.status(201).json({
    status: "Success",
    data,
  });
});

const createInvoice = TryCatch(async (req, res, next) => {
  const { items, ...invoice } = req.body;

  try {
    const transaction = prisma.$transaction(async (prismaClient) => {
      const invoiceTable = await prismaClient.invoice.create({
        data: {
          ...invoice,
          items: JSON.stringify(items),
          date: new Date(invoice.date),
          finalAmount: invoice.finalAmount,
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
      let paymentType = "Partial"; // Default to Partial = 1
      if (invoiceTable.paymentStatusId === 2) {
        paymentType = "Paid";
      } else if (invoiceTable.paymentStatusId === 3) {
        paymentType = "Unpaid";
      }
      // Creating Transaction log/history
      await prismaClient.transactionLog.create({
        data: {
          invoiceId: invoiceTable.id,
          paymentType,
          amountPaid: invoiceTable.paidAmount,
          remainingAmount: invoice.amount - invoiceTable.paidAmount,
        },
      });

      return "Successfully updated";
    });
    res.status(201).json({
      data: transaction,
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

    await db.transactionLog.deleteMany({
      where: { invoiceId },
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
    revenue,
    amount,
  } = req.body;
  const discount = parseInt(req.body.discount);

  const capitalAmountUpdate =
    invoiceType === "Sales"
      ? { increment: amountPaid }
      : { decrement: amountPaid };

  const substractDiscountFromRevenue =
    invoiceType === "Sales" ? parseInt(revenue) - discount : 0;

  await prisma.capital.update({
    where: {
      id: 1,
    },
    data: {
      amount: capitalAmountUpdate,
    },
  });

  const data = await prisma.invoice.update({
    where: { id: parseInt(req.params.id) },
    data: {
      paidAmount,
      remainingAmount,
      paymentStatusId,
      discount: discount,
      revenue: substractDiscountFromRevenue,
      finalAmount: parseInt(amount) - discount,
    },
  });

  if (!data) {
    return next(new ApiError("No Entry found with that ID", 404));
  }

  let paymentType = "Partial"; // Default to Partial = 1
  if (data.paymentStatusId === 2) {
    paymentType = "Paid";
  } else if (data.paymentStatusId === 3) {
    paymentType = "Unpaid";
  }

  // Create Transaction Log Entry
  await prisma.transactionLog.create({
    data: {
      invoiceId: data.id,
      paymentType,
      amountPaid: data.paidAmount,
      remainingAmount: data.remainingAmount,
    },
  });
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
