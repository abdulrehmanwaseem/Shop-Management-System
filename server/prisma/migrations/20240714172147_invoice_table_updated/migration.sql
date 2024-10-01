/*
  Warnings:

  - You are about to drop the `InvoiceHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvoiceHistory" DROP CONSTRAINT "InvoiceHistory_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "isCancelled" SET DEFAULT false;

-- DropTable
DROP TABLE "InvoiceHistory";
