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
  priceMax
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
    return result
  } catch (error) {
    throw new {
      type: 'PropertiesQueryError',
      message: `Error ao pegar as propriedades: ${error.message}`
    }
  } finally {
    await prisma.$disconnect()
  }
}

export default {
  getProperties
}
