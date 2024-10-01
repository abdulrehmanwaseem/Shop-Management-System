import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

export { prisma, connectToDB };
