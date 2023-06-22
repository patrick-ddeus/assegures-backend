import { PrismaClient } from '@prisma/client'
import httpStatus from 'http-status'
import { sanitizeObjects } from '../helpers/sanitizeObject.js'
import { UnidecodeString } from '../helpers/unidecode.js'
import PropertyService from '../services/property.service.js'

const prisma = new PrismaClient()

async function getProperties(req, res) {
  const { cities, districts, streets, locale, priceMin, priceMax } =
    sanitizeObjects(req.query)

  try {
    const properties = await PropertyService.getProperties({
      cities,
      streets,
      districts,
      locale,
      priceMin,
      priceMax
    })
    return res.status(httpStatus.OK).json(properties)
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

const createProperty = async function (req, res) {
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
    address: BodyAddress,
    number_of_rooms,
    number_of_bathrooms,
    number_of_garages,
    suites,
    total_area,
    building_area,
    characteristics: bodyCharacteristics
  } = sanitizeObjects(req.body)

  try {
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
    res.status(httpStatus.CREATED).json(property)
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'Erro, imóvel com esse título já cadastrado' })
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  } finally {
    await prisma.$disconnect()
  }
}

export default {
  getProperties,
  createProperty
}
