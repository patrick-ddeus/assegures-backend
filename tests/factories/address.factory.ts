import { prisma } from '@/configs'
import { faker } from '@faker-js/faker'

export async function createAddress(propertyId: number) {
  return prisma.propertyAddress.create({
    data: {
      street: faker.location.street(),
      street_index: faker.location.street(),
      district: faker.location.streetAddress(),
      district_index: faker.location.streetAddress(),
      property_id: propertyId,
      city: faker.location.city(),
      city_index: faker.location.city(),
      state: faker.location.state()
    }
  })
}
