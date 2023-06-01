-- CreateTable
CREATE TABLE "TransactionsToSign" (
    "id" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "signatures" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionsToSign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedTransactions" (
    "id" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "signatures" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignedTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionsToSign_transaction_key" ON "TransactionsToSign"("transaction");

-- CreateIndex
CREATE UNIQUE INDEX "SignedTransactions_transaction_key" ON "SignedTransactions"("transaction");
