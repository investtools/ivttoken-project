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
