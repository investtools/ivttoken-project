/*
  Warnings:

  - Added the required column `contractsId` to the `TransactionsToSign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionsToSign" ADD COLUMN     "contractsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionsToSign" ADD CONSTRAINT "TransactionsToSign_contractsId_fkey" FOREIGN KEY ("contractsId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
