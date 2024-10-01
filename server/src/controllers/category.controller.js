import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getCategories = getAll(prisma.category);
const createCategory = createOne(prisma.category);
const updateCategory = updateOne(prisma.category);
const deleteCategory = deleteOne(prisma.category);

export { getCategories, createCategory, updateCategory, deleteCategory };
