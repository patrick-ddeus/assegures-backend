import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async function (req, res) {
  try {
    const result = await prisma.propertyType.findMany({
      include: {
        properties_sub_types: true,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  } finally {
    await prisma.$disconnect();
  }
};

const createProperty = async function (req, res) {
  const
    { title,
      slogan,
      description,
      short_description,
      price,
      type_id,
      emphasis,
      goal,
      status,
      address: BodyAddress,
      number_of_rooms,
      number_of_bathrooms,
      number_of_garages,
      suites,
      total_area,
      building_area,
      characteristics: bodyCharacteristics
    } = req.body;

  try {
    const property = await prisma.property.create({
      data: {
        title,
        slogan,
        description,
        short_description,
        price,
        type: {
          connect: { id: type_id }
        },
        emphasis,
        goal,
        status,
        number_of_rooms,
        number_of_bathrooms,
        number_of_garages,
        suites,
        total_area,
        building_area,
        address: {
          create: {
            street: BodyAddress.street,
            city: BodyAddress.city,
            district: BodyAddress.district,
            state: BodyAddress.state,
          }
        },
        characteristics: {
          connectOrCreate: bodyCharacteristics.map((characterName) => {
            return {
              where: { name: characterName },
              create: { name: characterName }
            };
          })
        }
      }
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getProperties,
  createProperty
};
