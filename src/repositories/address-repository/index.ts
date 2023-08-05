import { AddressQueryParam } from '@/protocols'
import { UnidecodeString } from '@/helpers'
import { prisma } from '@/configs'
import { Prisma } from '@prisma/client'

async function listCities() {
  const result = prisma.city.findMany({})

  return result
}

export default {
  listCities
}
