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

  const lowOnStockCountQuery = prisma.$queryRaw`
    SELECT COUNT(*) AS lowOnStockCount
    FROM "Item"
    WHERE "stock" <= "lowOnStock"
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
      discount: true,
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

  // const oneLunarYearAgo = new Date();
  // oneLunarYearAgo.setDate(oneLunarYearAgo.getDate() - 360);

  const [
    inventoryResult,
    lowOnStockCountResult,
    purchase,
    sales,
    revenue,
    expense,
    capital,
  ] = await Promise.all([
    inventoryQuery,
    lowOnStockCountQuery,
    purchaseQuery,
    salesQuery,
    revenueQuery,
    expenseQuery,
    capitalQuery,
  ]);

  const totalInventory = inventoryResult[0]?.totalinventory;

  const lowOnStockCount = Number(lowOnStockCountResult[0]?.lowonstockcount);

  const totalExpense = parseInt(expense._sum.amount) || 0;
  const totalPurchase = purchase._sum;
  const totalSale = sales._sum;
  const totalSaleDiscount = parseInt(totalSale.discount) || 0;

  const totalRevenue =
    parseInt(revenue._sum.revenue || 0) - totalSaleDiscount - totalExpense;

  const expectedRevenue = parseInt(totalSale.revenue || 0) - totalSaleDiscount;

  const previousRecievable =
    44190 - 11500 - 3480 - 500 - 5000 - 4500 - 3000 - 11560 - 2400 - 1000 - 350;
  // 200 discount
  const amountInCash = parseInt(capital?.amount || 0) + 2400 + 1000 + 350;

  res.status(200).json({
    status: "Success",
    data: {
      totalInventory,
      lowOnStockCount,
      totalPurchase,
      totalSale,
      totalExpense,
      totalRevenue,
      expectedRevenue,
      amountInCash: amountInCash,
      previousRecievable: previousRecievable - 200 - 500,
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
