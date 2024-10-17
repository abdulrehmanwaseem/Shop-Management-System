import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  getParties,
} from "../utils/crudFunctions.js";

const getExpenses = getParties(prisma.party, "EXPENSE");
const createExpense = createOne(prisma.party, "EXPENSE");
const updateExpense = updateOne(prisma.party);
const deleteExpense = deleteOne(prisma.party);

export { getExpenses, createExpense, updateExpense, deleteExpense };
