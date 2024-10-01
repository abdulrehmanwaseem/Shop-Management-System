/*
  Warnings:

  - You are about to drop the column `oldPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - Added the required column `purchasePrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "oldPrice",
DROP COLUMN "price",
ADD COLUMN     "oldPurchasePrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "oldSalePrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "purchasePrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "salePrice" DECIMAL(65,30) NOT NULL;
