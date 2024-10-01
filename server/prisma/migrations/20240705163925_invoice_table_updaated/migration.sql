/*
  Warnings:

  - Added the required column `remainingAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "remainingAmount" DECIMAL(65,30) NOT NULL;
