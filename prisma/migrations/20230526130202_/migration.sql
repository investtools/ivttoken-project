/*
  Warnings:

  - You are about to drop the column `transaction` on the `SignedTransactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction` on the `TransactionsToSign` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionHash]` on the table `SignedTransactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionHash]` on the table `TransactionsToSign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionHash` to the `SignedTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionHash` to the `TransactionsToSign` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SignedTransactions_transaction_key";

-- DropIndex
DROP INDEX "TransactionsToSign_transaction_key";

-- AlterTable
ALTER TABLE "SignedTransactions" DROP COLUMN "transaction",
ADD COLUMN     "transactionHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionsToSign" DROP COLUMN "transaction",
ADD COLUMN     "transactionHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SignedTransactions_transactionHash_key" ON "SignedTransactions"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionsToSign_transactionHash_key" ON "TransactionsToSign"("transactionHash");
