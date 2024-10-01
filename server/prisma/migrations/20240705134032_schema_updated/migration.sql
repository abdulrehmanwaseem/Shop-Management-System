/*
  Warnings:

  - Added the required column `lowOnStock` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "lowOnStock" INTEGER NOT NULL,
ADD COLUMN     "oldPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
