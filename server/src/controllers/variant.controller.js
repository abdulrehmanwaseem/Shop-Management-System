import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getVariants = getAll(prisma.variant);
const createVariant = createOne(prisma.variant);
const updateVariant = updateOne(prisma.variant);
const deleteVariant = deleteOne(prisma.variant);

export { getVariants, createVariant, updateVariant, deleteVariant };
