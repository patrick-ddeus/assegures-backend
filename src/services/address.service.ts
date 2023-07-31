import { AddressQueryParam } from '@/protocols.js'
import addressRepository from '@/repositories/address-repository'

async function getAddress(queryParams: AddressQueryParam) {
  const result = await addressRepository.list(queryParams)

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
  getAddress
}
