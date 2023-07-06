-- CreateTable
CREATE TABLE "HelpProviders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelpProviders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HelpProviders_email_idx" ON "HelpProviders"("email");
