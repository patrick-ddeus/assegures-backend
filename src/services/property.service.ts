import { CreatePropertyBody, PropertyQueryParams } from '@/protocols.js'
import propertyRepository from '@/repositories/property-repository'
import { NoContentError } from '@/Errors'

async function getProperties(reqParams: PropertyQueryParams) {
  const result = await propertyRepository.listAllWithCount(reqParams)
  return result
}

async function getTypesAndSubtypes() {
  const result = await propertyRepository.listTypesAndSubtypes()

  if (!result) {
    throw NoContentError()
  }

  return result
}

async function createProperty(bodyParams: CreatePropertyBody) {
  const property = await propertyRepository.create(bodyParams)
  return property
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes
}
