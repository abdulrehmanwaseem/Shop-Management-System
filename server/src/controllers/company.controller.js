import { prisma } from "../config/dbConnection.js";
import {
  getAll,
  createOne,
  deleteOne,
  updateOne,
} from "../utils/crudFunctions.js";

const getCompanies = getAll(prisma.company);
const createCompany = createOne(prisma.company);
const updateCompany = updateOne(prisma.company);
const deleteCompany = deleteOne(prisma.company);

export { getCompanies, createCompany, updateCompany, deleteCompany };
