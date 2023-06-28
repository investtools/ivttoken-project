/*
  Warnings:

  - Added the required column `isOpen` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "isOpen" BOOLEAN NOT NULL;
