/*
  Warnings:

  - You are about to drop the column `contractsId` on the `TransactionsToSign` table. All the data in the column will be lost.
  - Added the required column `contractId` to the `SignedTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractId` to the `TransactionsToSign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionsToSign" DROP CONSTRAINT "TransactionsToSign_contractsId_fkey";

-- AlterTable
ALTER TABLE "SignedTransactions" ADD COLUMN     "contractId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionsToSign" DROP COLUMN "contractsId",
ADD COLUMN     "contractId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionsToSign" ADD CONSTRAINT "TransactionsToSign_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedTransactions" ADD CONSTRAINT "SignedTransactions_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
