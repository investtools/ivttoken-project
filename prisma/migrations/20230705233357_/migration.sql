-- CreateEnum
CREATE TYPE "ConnectionQuality" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Months" AS ENUM ('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');

-- CreateEnum
CREATE TYPE "Entity" AS ENUM ('GOVERNMENT', 'GIGA', 'UNICEF', 'INVESTTOOLS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "Administrators" AS ENUM ('MUNICIPALITY', 'STATE');

-- CreateEnum
CREATE TYPE "Benefits" AS ENUM ('TAX_BREAK');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SCHOOL', 'ADMIN', 'ISP');

-- CreateTable
CREATE TABLE "Schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "tokens" TEXT,
    "inepCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lat" TEXT,
    "lon" TEXT,
    "role" "Role" NOT NULL,
    "administrator" "Administrators" NOT NULL,
    "internetServiceProviderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectivityReport" (
    "id" TEXT NOT NULL,
    "month" "Months" NOT NULL,
    "noInternetDays" INTEGER NOT NULL,
    "connectionQuality" "ConnectionQuality" NOT NULL,
    "averageSpeed" INTEGER NOT NULL,
    "connectivityPercentage" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConnectivityReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entity" "Entity" NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternetServiceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tokenAmount" TEXT NOT NULL,
    "unlockedTokens" TEXT NOT NULL,
    "lockedTokens" TEXT NOT NULL,
    "spentTokens" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternetServiceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenTransactions" (
    "id" TEXT NOT NULL,
    "benefit" "Benefits" NOT NULL,
    "benefitPrice" TEXT NOT NULL,
    "internetServiceProviderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contracts" (
    "id" TEXT NOT NULL,
    "schoolsId" TEXT NOT NULL,
    "internetServiceProviderId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizedUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthorizedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionsToSign" (
    "id" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "signatures" TEXT[],
    "contractId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionsToSign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedTransactions" (
    "id" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "signatures" TEXT[],
    "contractId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignedTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolsToBeApproved" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "inepCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "administrator" "Administrators" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolsToBeApproved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternetServiceProviderToBeApproved" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternetServiceProviderToBeApproved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schools_inepCode_key" ON "Schools"("inepCode");

-- CreateIndex
CREATE UNIQUE INDEX "Schools_email_key" ON "Schools"("email");

-- CreateIndex
CREATE INDEX "Schools_email_idx" ON "Schools"("email");

-- CreateIndex
CREATE INDEX "Schools_city_idx" ON "Schools"("city");

-- CreateIndex
CREATE INDEX "Schools_state_idx" ON "Schools"("state");

-- CreateIndex
CREATE INDEX "Schools_internetServiceProviderId_idx" ON "Schools"("internetServiceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProvider_cnpj_key" ON "InternetServiceProvider"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProvider_email_key" ON "InternetServiceProvider"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProvider_email_idx" ON "InternetServiceProvider"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProvider_cnpj_idx" ON "InternetServiceProvider"("cnpj");

-- CreateIndex
CREATE INDEX "TokenTransactions_internetServiceProviderId_idx" ON "TokenTransactions"("internetServiceProviderId");

-- CreateIndex
CREATE INDEX "Contracts_internetServiceProviderId_idx" ON "Contracts"("internetServiceProviderId");

-- CreateIndex
CREATE INDEX "Contracts_schoolsId_idx" ON "Contracts"("schoolsId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedUsers_email_key" ON "AuthorizedUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionsToSign_transactionHash_key" ON "TransactionsToSign"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "SignedTransactions_transactionHash_key" ON "SignedTransactions"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolsToBeApproved_cnpj_key" ON "SchoolsToBeApproved"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolsToBeApproved_inepCode_key" ON "SchoolsToBeApproved"("inepCode");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolsToBeApproved_email_key" ON "SchoolsToBeApproved"("email");

-- CreateIndex
CREATE INDEX "SchoolsToBeApproved_cnpj_idx" ON "SchoolsToBeApproved"("cnpj");

-- CreateIndex
CREATE INDEX "SchoolsToBeApproved_email_idx" ON "SchoolsToBeApproved"("email");

-- CreateIndex
CREATE INDEX "SchoolsToBeApproved_city_idx" ON "SchoolsToBeApproved"("city");

-- CreateIndex
CREATE INDEX "SchoolsToBeApproved_state_idx" ON "SchoolsToBeApproved"("state");

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProviderToBeApproved_cnpj_key" ON "InternetServiceProviderToBeApproved"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProviderToBeApproved_email_key" ON "InternetServiceProviderToBeApproved"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProviderToBeApproved_email_idx" ON "InternetServiceProviderToBeApproved"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProviderToBeApproved_cnpj_idx" ON "InternetServiceProviderToBeApproved"("cnpj");

-- CreateIndex
CREATE INDEX "Tickets_email_idx" ON "Tickets"("email");

-- AddForeignKey
ALTER TABLE "Schools" ADD CONSTRAINT "Schools_internetServiceProviderId_fkey" FOREIGN KEY ("internetServiceProviderId") REFERENCES "InternetServiceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectivityReport" ADD CONSTRAINT "ConnectivityReport_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenTransactions" ADD CONSTRAINT "TokenTransactions_internetServiceProviderId_fkey" FOREIGN KEY ("internetServiceProviderId") REFERENCES "InternetServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_internetServiceProviderId_fkey" FOREIGN KEY ("internetServiceProviderId") REFERENCES "InternetServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_schoolsId_fkey" FOREIGN KEY ("schoolsId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizedUsers" ADD CONSTRAINT "AuthorizedUsers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsToSign" ADD CONSTRAINT "TransactionsToSign_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedTransactions" ADD CONSTRAINT "SignedTransactions_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
