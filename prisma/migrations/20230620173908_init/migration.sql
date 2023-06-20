-- CreateTable
CREATE TABLE "PropertyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertySubType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "property_type_id" INTEGER NOT NULL,

    CONSTRAINT "PropertySubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyCharacteristic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PropertyCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slogan" TEXT,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "emphasis" BOOLEAN NOT NULL DEFAULT false,
    "goal" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "number_of_rooms" INTEGER NOT NULL,
    "number_of_bathrooms" INTEGER NOT NULL,
    "number_of_garages" INTEGER NOT NULL,
    "suites" INTEGER NOT NULL,
    "total_area" INTEGER NOT NULL,
    "building_area" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "PropertyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyToPropertyCharacteristic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAddress_property_id_key" ON "PropertyAddress"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToPropertyCharacteristic_AB_unique" ON "_PropertyToPropertyCharacteristic"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToPropertyCharacteristic_B_index" ON "_PropertyToPropertyCharacteristic"("B");

-- AddForeignKey
ALTER TABLE "PropertySubType" ADD CONSTRAINT "PropertySubType_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "PropertyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "PropertyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAddress" ADD CONSTRAINT "PropertyAddress_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristic" ADD CONSTRAINT "_PropertyToPropertyCharacteristic_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToPropertyCharacteristic" ADD CONSTRAINT "_PropertyToPropertyCharacteristic_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyCharacteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
