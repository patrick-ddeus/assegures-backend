import { AddressQueryParam } from '@/protocols'
import { UnidecodeString } from '@/helpers'
import { prisma } from '@/configs'
import { Prisma } from '@prisma/client'

async function list({ locale, goal }: AddressQueryParam): Promise<SQLResult[]> {
  const where: Prisma.PropertyAddressWhereInput = {}
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

  const result = await prisma.$queryRaw<SQLResult[]>`
      SELECT
  json_agg(json_build_object('id', pa.id, 'city', pa.city, 'state', pa.state)) AS cities,
  json_agg(json_build_object('id', pa.id, 'district', pa.district, 'city', pa.city, 'state', pa.state)) AS districts,
  json_agg(json_build_object('id', pa.id, 'district', pa.district, 'city', pa.city, 'state', pa.state, 'street', pa.street)) AS streets
    FROM
      "PropertyAddress" AS pa
    JOIN
      "Property" AS p ON pa.property_id = p.id
    WHERE
      (pa.city_index ILIKE '%' || ${localeClean} || '%' OR
      pa.district_index ILIKE '%' || ${localeClean} || '%' OR
      pa.street_index ILIKE '%' || ${localeClean} || '%')
      AND p.goal = ${goal}
    GROUP BY pa.id, pa.city, pa.district, pa.state, pa.street;
    `

  return result
}

type Cities = {
  id: number
  city: string
  state: string
}

type Districts = {
  id: number
  district: string
  city: string
  state: string
}

type Streets = {
  id: number
  district: string
  city: string
  state: string
  street: string
}

type SQLResult = {
  cities: Cities[]
  districts: Districts[]
  streets: Streets[]
}

export default {
  list
}
