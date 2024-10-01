import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getExpenses = getAll(prisma.expense);
const createExpense = createOne(prisma.expense);
const updateExpense = updateOne(prisma.expense);
const deleteExpense = deleteOne(prisma.expense);

export { getExpenses, createExpense, updateExpense, deleteExpense };
