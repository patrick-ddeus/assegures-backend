import { prisma } from "@/configs";

export async function cleanDb() {
  await prisma.propertyAddress.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.propertySubType.deleteMany({});
  await prisma.propertyType.deleteMany({});
}