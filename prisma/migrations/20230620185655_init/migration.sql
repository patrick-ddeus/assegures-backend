/*
  Warnings:

  - You are about to drop the column `road` on the `PropertyAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `PropertyCharacteristic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PropertyAddress" DROP COLUMN "road";

-- CreateIndex
CREATE UNIQUE INDEX "Property_title_key" ON "Property"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyCharacteristic_name_key" ON "PropertyCharacteristic"("name");
