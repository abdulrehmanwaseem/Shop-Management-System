import { prisma } from "../config/dbConnection.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getParties,
} from "../utils/crudFunctions.js";

const getVendors = getParties(prisma.party, "VENDOR");
const createVendor = createOne(prisma.party, "VENDOR");
const updateVendor = updateOne(prisma.party);
const deleteVendor = deleteOne(prisma.party);

export { getVendors, createVendor, updateVendor, deleteVendor };
