import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getCustomers = getAll(prisma.customer);
const createCustomer = createOne(prisma.customer);
const updateCustomer = updateOne(prisma.customer);
const deleteCustomer = deleteOne(prisma.customer);

export { getCustomers, createCustomer, updateCustomer, deleteCustomer };
