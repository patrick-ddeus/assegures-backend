import { prisma } from '@/configs'
import { faker } from '@faker-js/faker'

export async function createProperty(typeId: number, subtypeId: number) {
  return prisma.property.create({
    data: {
      title: faker.lorem.words(3),
      slogan: faker.lorem.words(5),
      description: faker.lorem.paragraph(),
      short_description: faker.lorem.sentence(),
      price: faker.number.int({ min: 100000, max: 1000000 }),
      type: {
        connect: {
          id: typeId
        }
      },
      subtype: {
        connect: {
          id: subtypeId
        }
      },
      emphasis: faker.datatype.boolean(),
      goal: faker.lorem.word(),
      status: faker.datatype.boolean(),
      number_of_rooms: faker.number.int({ min: 1, max: 5 }),
      number_of_bathrooms: faker.number.int({ min: 1, max: 3 }),
      number_of_garages: faker.number.int({ min: 0, max: 2 }),
      suites: faker.number.int({ min: 0, max: 2 }),
      total_area: faker.number.int({ min: 50, max: 200 }),
      characteristics: {
        connectOrCreate: [
          {
            where: { name: 'Água' },
            create: { name: 'Água' }
          },
        ]
      },
      building_area: faker.number.int({ min: 30, max: 150 })
    }
  })
}
