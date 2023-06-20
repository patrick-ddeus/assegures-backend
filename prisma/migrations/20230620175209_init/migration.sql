/*
  Warnings:

  - Added the required column `street` to the `PropertyAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyAddress" ADD COLUMN     "street" TEXT NOT NULL;
