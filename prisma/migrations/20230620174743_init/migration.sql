/*
  Warnings:

  - You are about to drop the column `street` on the `PropertyAddress` table. All the data in the column will be lost.
  - Added the required column `road` to the `PropertyAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyAddress" DROP COLUMN "street",
ADD COLUMN     "road" TEXT NOT NULL;
