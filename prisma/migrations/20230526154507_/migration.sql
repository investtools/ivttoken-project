/*
  Warnings:

  - The `signatures` column on the `SignedTransactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `signatures` column on the `TransactionsToSign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SignedTransactions" DROP COLUMN "signatures",
ADD COLUMN     "signatures" TEXT[];

-- AlterTable
ALTER TABLE "TransactionsToSign" DROP COLUMN "signatures",
ADD COLUMN     "signatures" TEXT[];
