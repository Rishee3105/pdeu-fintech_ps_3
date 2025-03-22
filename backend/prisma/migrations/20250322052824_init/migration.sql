/*
  Warnings:

  - Added the required column `total_transaction_with_tax` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "total_transaction_with_tax" DECIMAL(65,30) NOT NULL;
