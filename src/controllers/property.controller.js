/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'
import httpStatus from 'http-status'
import { sanitizeObjects } from '../helpers/sanitizeObject.js'
import PropertyService from '../services/property.service.js'


async function getProperties(req, res) {
  const { cities, districts, streets, locale, priceMin, priceMax, goal } =
    sanitizeObjects(req.query)

  try {
    const properties = await PropertyService.getProperties({
      cities,
      streets,
      districts,
      locale,
      priceMin,
      priceMax,
      goal
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

  
    const property = await PropertyService.createProperty(
      {
        title,
        slogan,
        description,
        short_description,
        price,
        type_id,
        emphasis,
        goal,
        status,
        BodyAddress,
        number_of_rooms,
        number_of_bathrooms,
        number_of_garages,
        suites,
        total_area,
        building_area,
        bodyCharacteristics
      }
    )
    res.status(httpStatus.CREATED).json(property)
}

const getTypesAndSubtypes = async function (req, res){
  const types = await PropertyService.getTypesAndSubtypes()
  res.status(200).json(types)
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes
}
