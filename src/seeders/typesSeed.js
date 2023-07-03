import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createPropertyTypesAndSubTypes = async () => {
  const tipoResidencial = await prisma.propertyType.create({
    data: {
      name: 'residencial',
    },
  });

  const tipoComercial = await prisma.propertyType.create({
    data: {
      name: 'comercial',
    },
  });

  await prisma.propertySubType.create({
    data: {
      name: 'casa',
      property_type_id: tipoResidencial.id,
    },
  });

  await prisma.propertySubType.create({
    data: {
      name: 'escritório',
      property_type_id: tipoComercial.id,
    },
  });

  console.log('Tipos e subtipos criados com sucesso');
};

createPropertyTypesAndSubTypes()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });