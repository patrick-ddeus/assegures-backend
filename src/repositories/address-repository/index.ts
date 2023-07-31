import { AddressQueryParam } from '@/protocols'
import { UnidecodeString } from '@/helpers'
import { prisma } from '@/configs'
import { Prisma } from '@prisma/client'

async function list({ locale, goal }: AddressQueryParam) {
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

  if (goal) {
    where.AND = {
      property: {
        goal: goal
      }
    }
  }

  const result = prisma.propertyAddress.findMany({
    where
  })

  return result
}

export default {
  list
}
