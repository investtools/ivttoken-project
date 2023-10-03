-- AlterTable
ALTER TABLE "HelpProviders" ADD COLUMN     "messages" TEXT[] DEFAULT ARRAY[]::TEXT[];
