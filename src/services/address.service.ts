import addressRepository from '@/repositories/address-repository'
import { NoContentError } from '../Errors'

async function getCities() {
  const result = await addressRepository.listCities()

  if (result.length === 0) {
    throw NoContentError()
  }

  return result
}

export default {
  getCities
}
