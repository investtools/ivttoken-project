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

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProviderToBeApproved_cnpj_key" ON "InternetServiceProviderToBeApproved"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "InternetServiceProviderToBeApproved_email_key" ON "InternetServiceProviderToBeApproved"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProviderToBeApproved_email_idx" ON "InternetServiceProviderToBeApproved"("email");

-- CreateIndex
CREATE INDEX "InternetServiceProviderToBeApproved_cnpj_idx" ON "InternetServiceProviderToBeApproved"("cnpj");
