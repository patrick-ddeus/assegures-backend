import { AddressQueryParam, CreatePropertyBody, PropertyQueryParams } from '@/protocols.js'
import propertyRepository from '@/repositories/property-repository'
import { NoContentError, badRequestError } from '@/Errors'

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

async function getPropertyById(id: string) {
  const parsedId = checkIdAndValid(id)
  const property = await propertyRepository.listPropertyById(parsedId)

  if(!property){
    throw NoContentError()
  }

  return property
}

function checkIdAndValid(id: string) {
  const idAsInteger = parseInt(id)

  if (isNaN(idAsInteger)) {
    throw badRequestError()
  }

  return idAsInteger
}

async function getAddress(queryParams: AddressQueryParam) {
  const result = await propertyRepository.listAddress(queryParams)

  const formatedResult = separateProperties(result)

  return formatedResult
}

function separateProperties(data: OriginalData[]) {
  const cities: CityData[] = data.map((item) => ({
    id: item.id,
    city: item.city,
    state: item.state
  }))

  const districts: DistrictData[] = data.map((item) => ({
    id: item.id,
    city: item.city,
    state: item.state,
    district: item.district
  }))

  const streets: StreetData[] = data.map((item) => ({
    id: item.id,
    city: item.city,
    state: item.state,
    district: item.district,
    street: item.street
  }))

  return { cities, streets, districts }
}

interface OriginalData {
  id: number
  city: string
  city_index: string
  district: string
  district_index: string
  street: string
  street_index: string
  state: string
  property_id: number
}

interface CityData {
  id: number
  city: string
  state: string
}

interface StreetData {
  id: number
  street: string
}

interface DistrictData {
  id: number
  district: string
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes,
  getPropertyById,
  getAddress
}
