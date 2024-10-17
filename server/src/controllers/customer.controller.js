import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  getParties,
} from "../utils/crudFunctions.js";

const getCustomers = getParties(prisma.party, "CUSTOMER");
const createCustomer = createOne(prisma.party, "CUSTOMER");
const updateCustomer = updateOne(prisma.party);
const deleteCustomer = deleteOne(prisma.party);

export { getCustomers, createCustomer, updateCustomer, deleteCustomer };
