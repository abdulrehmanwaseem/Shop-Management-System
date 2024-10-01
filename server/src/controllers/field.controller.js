import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getFields = getAll(prisma.field);
const createField = createOne(prisma.field);
const updateField = updateOne(prisma.field);
const deleteField = deleteOne(prisma.field);

export { getFields, createField, updateField, deleteField };
