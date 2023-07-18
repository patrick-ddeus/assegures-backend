/*
  Warnings:

  - Added the required column `city_index` to the `PropertyAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_index` to the `PropertyAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_index` to the `PropertyAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyAddress" ADD COLUMN     "city_index" TEXT NOT NULL,
ADD COLUMN     "district_index" TEXT NOT NULL,
ADD COLUMN     "street_index" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PropertyImages" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "PropertyImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PropertyAddress_city_district_street_idx" ON "PropertyAddress"("city", "district", "street");
