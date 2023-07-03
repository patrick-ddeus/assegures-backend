import { PrismaClient } from '@prisma/client'
import { UnidecodeString } from '../helpers/unidecode.js'

const prisma = new PrismaClient()

async function getAddress(locale) {
  const where = {}
  let localeClean = locale

  if (locale) {
    localeClean = UnidecodeString(locale)
    where.OR = [
      {
        city_index: {
          contains: localeClean,
          mode: 'insensitive'
        }
      },
      {
        district_index: {
          contains: localeClean,
          mode: 'insensitive'
        }
      },
      {
        street_index: {
          contains: localeClean,
          mode: 'insensitive'
        }
      }
    ]
  }

  try {
    const [result] = await prisma.$queryRaw`
             SELECT
            json_agg(json_build_object('id', id, 'city', city, 'state', state)) AS cities,
            json_agg(json_build_object('id', id, 'district', district, 'city', city, 'state', state)) AS districts,
            json_agg(json_build_object('id', id, 'district', district, 'city', city, 'state', state, 'street', street)) AS streets
            FROM (
            SELECT DISTINCT
                id,
                city,
                district,
                state,
                street
            FROM
                "PropertyAddress"
            WHERE
                city_index ILIKE '%' || ${localeClean} || '%' OR
                district_index ILIKE '%' || ${localeClean} || '%' OR
                street_index ILIKE '%' || ${localeClean} || '%'
            GROUP BY id, city, district, state, street
            ) AS subquery;
        `
        
    if (
      result.cities !== null || 
      result.districts !== null || 
      result.streets !== null
      ) {
      const uniqueCities = result.cities.filter((city, index, self) => {
        return (
          index ===
          self.findIndex((c) => c.city === city.city && c.state === city.state)
        )
      })
      return [{ ...result, cities: uniqueCities }]
    }

    return result
  } catch (error) {
    throw {
      type: 'PropertiesQueryError',
      message: `Error ao pegar as propriedades: ${error.message}`
    }()
  } finally {
    await prisma.$disconnect()
  }
}

export default {
  getAddress
}
