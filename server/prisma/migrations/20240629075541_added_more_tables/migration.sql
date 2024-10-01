/*
  Warnings:

  - You are about to drop the column `invoiceType` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "invoiceType",
DROP COLUMN "paymentStatus",
ADD COLUMN     "invoiceTypeId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "paymentStatusId" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "InvoiceType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateTable
CREATE TABLE "InvoiceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoiceTypeId_fkey" FOREIGN KEY ("invoiceTypeId") REFERENCES "InvoiceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "PaymentStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
