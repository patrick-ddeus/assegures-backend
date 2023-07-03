/* eslint-disable eol-last */
import { PrismaClient } from '@prisma/client'
import { UnidecodeString } from '../helpers/unidecode.js'

const prisma = new PrismaClient()

async function getProperties({
  cities,
  streets,
  districts,
  locale,
  priceMin,
  priceMax,
  goal
}) {
  const where = {}

  if (locale) {
    const localeClean = UnidecodeString(locale)
    where.OR = [
      {
        address: {
          city_index: {
            contains: localeClean,
            mode: 'insensitive'
          }
        }
      },
      {
        address: {
          district_index: {
            contains: localeClean,
            mode: 'insensitive'
          }
        }
      },
      {
        address: {
          street_index: {
            contains: localeClean,
            mode: 'insensitive'
          }
        }
      }
    ]
  }

  if (cities) {
    where.address = {
      city: {
        in: cities.split(','),
        mode: 'insensitive'
      }
    }
  }

  if (districts) {
    where.address = {
      district: {
        in: districts.split(','),
        mode: 'insensitive'
      }
    }
  }

  if (streets) {
    where.address = {
      street: {
        in: streets.split(','),
        mode: 'insensitive'
      }
    }
  }

  if (priceMin && priceMax) {
    where.AND = [
      {
        price: {
          gte: priceMin
        }
      },
      {
        price: {
          lte: priceMax
        }
      }
    ]
  } else if (priceMin) {
    where.price = {
      gte: priceMin
    }
  } else if (priceMax) {
    where.price = {
      lte: priceMax
    }
  }

  if(goal){
    where.goal = {
      contains: goal,
      mode: 'insensitive'
    }
  }

  try {
    const result = await prisma.property.findMany({
      where,
      include: {
        characteristics: true,
        address: {
          select: {
            id: true,
            city: true,
            district: true,
            street: true,
            state: true
          }
        }
      }
    })

    const totalCount = await prisma.property.count({ where });
    return [...result, {totalCount}]
  } catch (error) {
    throw {
      type: 'PropertiesQueryError',
      message: `Error ao pegar as propriedades: ${error.message}`
    }
  } finally {
    await prisma.$disconnect()
  }
}

async function getTypesAndSubtypes () {
  try {
    const result = await prisma.$queryRaw`
    SELECT
      pt.name AS type_name,
      JSON_AGG(json_build_object('name', pst.name )) AS sub_types
    FROM
      "PropertyType" pt
    LEFT JOIN
      "PropertySubType" pst ON pt.id = pst.property_type_id
    GROUP BY
      pt.name;
    `

    return result
  } catch (error) {
    console.log(error)
    throw {
      type: 'TypesQueryError',
      message: `Error ao pegar os tipos: ${error.message}`
    }
  } finally {
    await prisma.$disconnect()
  }
}

async function createProperty (reqParams) {
  const {
    title,
    slogan,
    description,
    short_description,
    price,
    type_id,
    emphasis,
    goal,
    status,
    BodyAddress,
    number_of_rooms,
    number_of_bathrooms,
    number_of_garages,
    suites,
    total_area,
    building_area,
    bodyCharacteristics
  } = reqParams

  
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
            street_index: UnidecodeString(BodyAddress.street),
            city: BodyAddress.city,
            city_index: UnidecodeString(BodyAddress.city),
            district: BodyAddress.district,
            district_index: UnidecodeString(BodyAddress.district),
            state: BodyAddress.state
          }
        },
        characteristics: {
          connectOrCreate: bodyCharacteristics.map((characterName) => {
            return {
              where: { name: characterName },
              create: { name: characterName }
            }
          })
        }
      }
    })
    
    return property
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes
}
