import { prisma } from "../config/dbConnection.js";
import TryCatch from "express-async-handler";

const getTransactionLogs = TryCatch(async (req, res, next) => {
  const [data, totalRecords] = await Promise.all([
    prisma.transactionLog.findMany({
      include: {
        invoice: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { invoiceId: "asc" },
    }),
    prisma.transactionLog.count(),
  ]);

  res.status(200).json({
    status: "Success",
    totalRecords,
    data,
  });
});

const getTransactionLogsByFilter = TryCatch(async (req, res, next) => {
  const { id, name } = req.query;

  const filters = {
    OR: [
      name
        ? {
            invoice: {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
          }
        : {},
    ],
  };

  if (id) {
    filters.OR.push({
      invoiceId: parseInt(id),
    });
  }

  const [data, totalRecords] = await Promise.all([
    prisma.transactionLog.findMany({
      include: {
        invoice: {
          select: {
            name: true,
          },
        },
      },
      where: filters,
      orderBy: { invoiceId: "asc" },
    }),
    prisma.transactionLog.count(),
  ]);
  console.log(data);

  res.status(200).json({
    status: "Success",
    totalRecords,
    data,
  });
});

export { getTransactionLogs, getTransactionLogsByFilter };
