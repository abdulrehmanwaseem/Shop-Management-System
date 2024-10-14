import { prisma } from "../config/dbConnection.js";
import TryCatch from "express-async-handler";

const getTransactionLogs = TryCatch(async (req, res, next) => {
  const [data, totalRecords] = await Promise.all([
    prisma.transactionLog.findMany({
      include: {
        invoice: {
          select: {
            name: true,
            paymentStatus: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { id: "asc" },
    }),
    prisma.transactionLog.count(),
  ]);

  res.status(200).json({
    status: "Success",
    totalRecords,
    data,
  });
});

export { getTransactionLogs };
