import supertest from 'supertest'
import app, { init } from '@/app'
import { createProperty } from '../factories/property.factory'
import { createAddress } from '../factories/address.factory'
import httpStatus from 'http-status'
import { createPropertyType } from '../factories/propertyTypes.factory'
import { cleanDb } from '../helpers'

beforeAll(async () => {
  await init()
  await cleanDb()
})

const server = supertest(app)

describe('GET /properties', () => {
  it('should return 200 with all properties', async () => {
    const propertyType = await createPropertyType()
    const property = await createProperty(
      propertyType.id,
      propertyType.properties_sub_types[0].id
    )

    const address = await createAddress(property.id)

    const { status, body } = await server.get('/properties')

    expect(status).toBe(httpStatus.OK)
    expect(body).toEqual([
      {
        id: property.id,
        title: expect.any(String),
        ref: expect.any(String),
        description: expect.any(String),
        short_description: expect.any(String),
        price: expect.any(String),
        type_id: expect.any(Number),
        subtype_id: expect.any(Number),
        emphasis: expect.any(Boolean),
        goal: expect.any(String),
        status: expect.any(Boolean),
        number_of_rooms: expect.any(Number),
        number_of_bathrooms: expect.any(Number),
        number_of_garages: expect.any(Number),
        suites: expect.any(Number),
        total_area: expect.any(Number),
        building_area: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        characteristics: [
          {
            id: expect.any(Number),
            name: expect.any(String)
          }
        ],
        address: {
          id: address.id,
          city: expect.any(String),
          district: expect.any(String),
          street: expect.any(String),
          state: expect.any(String)
        }
      },
      {
        totalCount: expect.any(Number)
      }
    ])
  })
})
