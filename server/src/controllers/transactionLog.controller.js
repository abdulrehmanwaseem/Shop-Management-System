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
  const { invoiceId = 0, name = "" } = req.query;
  const [data, totalRecords] = await Promise.all([
    prisma.transactionLog.findMany({
      where: {
        OR: [
          {
            invoice: {
              name: {
                startsWith: name,
                endsWith: name,
              },
            },
          },
          {
            invoiceId: parseInt(invoiceId),
          },
        ],
      },
      include: {
        invoice: {
          select: {
            name: true,
            invoiceType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
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
