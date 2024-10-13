import { prisma } from "../config/dbConnection.js";
import TryCatch from "express-async-handler";

const getDashboardData = TryCatch(async (req, res, next) => {
  const dateRange = req.body.dateRange;

  const date = dateRange ? dateRange.split(" to ") : [];
  const startDate = new Date(date[0] || Date.now());

  const endDate = new Date(date[1] || startDate);

  const inventoryQuery = prisma.$queryRaw`
    SELECT SUM("purchasePrice" * "stock") AS totalinventory
    FROM "Item"
  `;

  const purchaseQuery = prisma.invoice.aggregate({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      isCancelled: false,
      invoiceTypeId: 2,
    },
    _sum: {
      remainingAmount: true,
      finalAmount: true,
      discount: true,
    },
  });

  const purchaseDiscountQuery = prisma.invoice.aggregate({
    where: {
      isCancelled: false,
      invoiceTypeId: 2,
    },
    _sum: {
      discount: true,
    },
  });

  const salesQuery = prisma.invoice.aggregate({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      isCancelled: false,
      invoiceTypeId: 3,
    },
    _sum: {
      finalAmount: true,
      remainingAmount: true,
      revenue: true,
    },
  });

  const revenueQuery = prisma.invoice.aggregate({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      isCancelled: false,
      paymentStatusId: 2,
      invoiceTypeId: 3,
    },
    _sum: {
      revenue: true,
    },
  });
  const expenseQuery = prisma.invoice.aggregate({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },

      isCancelled: false,
      invoiceTypeId: 1,
    },
    _sum: {
      amount: true,
    },
  });

  const capitalQuery = prisma.capital.findFirst({
    where: {
      id: 1,
    },
  });

  const [
    inventoryResult,
    purchase,
    sales,
    salesRevenue,
    expense,
    capital,
    purchaseDiscount,
  ] = await Promise.all([
    inventoryQuery,
    purchaseQuery,
    salesQuery,
    revenueQuery,
    expenseQuery,
    capitalQuery,
    purchaseDiscountQuery,
  ]);

  const totalInventory = inventoryResult[0]?.totalinventory;

  const totalExpense = parseInt(expense._sum.amount) || 0;
  const totalPurchase = purchase._sum;
  const totalSale = sales._sum;
  const totalPurchaseDiscount = parseInt(purchaseDiscount._sum.discount || 0);

  const totalRevenue = parseInt(salesRevenue._sum.revenue || 0) - totalExpense;

  console.log(totalPurchaseDiscount);

  const expectedRevenue = totalSale.revenue || 0;

  const amountInCash = parseInt(capital?.amount || 0) + totalPurchaseDiscount;

  res.status(200).json({
    status: "Success",
    data: {
      totalInventory,
      totalPurchase,
      totalSale,
      totalExpense,
      totalRevenue,
      expectedRevenue,
      amountInCash: amountInCash,
    },
  });
});

const getDashboardTablesData = TryCatch(async (req, res, next) => {
  const dateRange = req.body.dateRange;
  const date = dateRange ? dateRange.split(" to ") : [];
  const startDate = new Date(date[0] || Date.now());

  const endDate = new Date(date[1] || startDate);

  const recievableItems = await prisma.invoice.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      invoiceTypeId: 3,
      remainingAmount: { gt: 0 },
      isCancelled: false,
    },
    include: {
      paymentStatus: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      remainingAmount: "desc",
    },
  });

  const payableItems = await prisma.invoice.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },

      invoiceTypeId: 2, // Purchase invoices
      remainingAmount: { gt: 0 },
      isCancelled: false,
    },
    include: {
      paymentStatus: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      remainingAmount: "desc",
    },
  });

  const expensesItems = await prisma.invoice.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },

      invoiceTypeId: 1, // Expense invoices
      remainingAmount: { gt: 0 },
      isCancelled: false,
    },
    include: {
      paymentStatus: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      remainingAmount: "desc",
    },
  });

  const lowOnStockItems = await prisma.$queryRaw`
  SELECT "Item".*, "Company"."name" as "company"
  FROM "Item"
  JOIN "Company" ON "Item"."companyId" = "Company"."id"
  WHERE "Item"."stock" < "Item"."lowOnStock"
  ORDER BY "Item"."stock" ASC
`;

  res.status(200).json({
    status: "Success",
    data: { lowOnStockItems, recievableItems, payableItems, expensesItems },
  });
});

export { getDashboardData, getDashboardTablesData };
