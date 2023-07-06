/*
  Warnings:

  - You are about to drop the column `cnpj` on the `SchoolsToBeApproved` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SchoolsToBeApproved_cnpj_idx";

-- DropIndex
DROP INDEX "SchoolsToBeApproved_cnpj_key";

-- AlterTable
ALTER TABLE "SchoolsToBeApproved" DROP COLUMN "cnpj";
