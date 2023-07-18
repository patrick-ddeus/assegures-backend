/*
  Warnings:

  - Added the required column `subtype_id` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "subtype_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_subtype_id_fkey" FOREIGN KEY ("subtype_id") REFERENCES "PropertySubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
