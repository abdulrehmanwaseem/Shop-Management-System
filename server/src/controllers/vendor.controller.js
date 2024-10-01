import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getVendors = getAll(prisma.vendor);
const createVendor = createOne(prisma.vendor);
const updateVendor = updateOne(prisma.vendor);
const deleteVendor = deleteOne(prisma.vendor);

export { getVendors, createVendor, updateVendor, deleteVendor };
