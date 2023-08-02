import { prisma } from '@/configs'
import { CreatePropertyBody, PropertyQueryParams } from '@/protocols'
import { Prisma } from '@prisma/client'
import { UnidecodeString } from '@/helpers'

async function listAllWithCount({
  cities,
  streets,
  districts,
  locale,
  priceMin,
  priceMax,
  goal,
  propertyType,
  propertySubType,
  areaMin,
  areaMax,
  rooms
}: PropertyQueryParams) {

  const where: Prisma.PropertyWhereInput = {}
  
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
    where.OR = (where.OR || []).concat(
      cities.split(',').map((city) => ({
        address: {
          city: {
            equals: city,
            mode: 'insensitive'
          }
        }
      }))
    )
  }

  if (districts) {
    where.OR = (where.OR || []).concat(
      districts.split(',').map((district) => ({
        address: {
          district: {
            equals: district,
            mode: 'insensitive'
          }
        }
      }))
    )
  }

  if (streets) {
    where.OR = (where.OR || []).concat(
      streets.split(',').map((street) => ({
        address: {
          street: {
            equals: street,
            mode: 'insensitive'
          }
        }
      }))
    )
  }

  if (priceMin && priceMax) {
    where.AND = [
      {
        price: {
          gte: priceMin.replace(/\D+/g, '')
        }
      },
      {
        price: {
          lte: priceMax.replace(/\D+/g, '')
        }
      }
    ]
  } else if (priceMin) {
    where.price = {
      gte: priceMin.replace(/\D+/g, '')
    }
  } else if (priceMax) {
    where.price = {
      lte: priceMax.replace(/\D+/g, '')
    }
  }

  if (goal) {
    where.goal = {
      contains: goal,
      mode: 'insensitive'
    }
  }

  if (propertyType) {
    where.AND = ((where.AND as Prisma.PropertyWhereInput[]) || []).concat([
      {
        type_id: {
          equals: Number(propertyType)
        }
      },
      {
        subtype_id: {
          equals: Number(propertySubType)
        }
      }
    ])
  }

  if (areaMin && areaMax) {
    where.AND = ((where.AND as Prisma.PropertyWhereInput[]) || []).concat([
      {
        total_area: {
          gte: Number(areaMin.replace(/\D+/g, ''))
        }
      },
      {
        total_area: {
          lte: Number(areaMax.replace(/\D+/g, ''))
        }
      }
    ])
  }

  if (rooms) {
    where.AND = ((where.AND as Prisma.PropertyWhereInput[]) || []).concat([
      {
        number_of_rooms: {
          gte: Number(rooms)
        }
      }
    ])
  }

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
  const totalCount = await prisma.property.count({ where })
  return [...result, { totalCount }]
}

async function create(bodyParams: CreatePropertyBody) {
  const {
    title,
    slogan,
    description,
    short_description,
    price,
    type_id,
    subtype_id,
    emphasis,
    goal,
    status,
    bodyAddress,
    number_of_rooms,
    number_of_bathrooms,
    number_of_garages,
    suites,
    total_area,
    building_area,
    bodyCharacteristics
  } = bodyParams

  return prisma.property.create({
    data: {
      title,
      slogan,
      description,
      short_description,
      price,
      type: {
        connect: { id: type_id }
      },
      subtype: {
        connect: { id: subtype_id }
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
          street: bodyAddress.street,
          street_index: UnidecodeString(bodyAddress.street),
          city: bodyAddress.city,
          city_index: UnidecodeString(bodyAddress.city),
          district: bodyAddress.district,
          district_index: UnidecodeString(bodyAddress.district),
          state: bodyAddress.state
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
}

async function listTypesAndSubtypes() {
  return prisma.$queryRaw<SQLResult>`
    SELECT
      pt.name AS type_name,
      pt.id AS id,
      JSON_AGG(json_build_object('id', pst.id, 'name', pst.name )) AS sub_types
    FROM
      "PropertyType" pt
    LEFT JOIN
      "PropertySubType" pst ON pt.id = pst.property_type_id
    GROUP BY
      pt.name, pt.id;
    `
}

type SubType = {
  id: number
  name: string
}

type SQLResult = {
  type_name: string
  id: number
  sub_types: SubType[]
}

export default {
  listAllWithCount,
  listTypesAndSubtypes,
  create
}
