import { AddressQueryParam } from '@/protocols.js'
import addressRepository from '@/repositories/address-repository'

async function getAddress(queryParams: AddressQueryParam) {
  const [result] = await addressRepository.list(queryParams)

  if (
    result.cities !== null ||
    result.districts !== null ||
    result.streets !== null
  ) {
    const uniqueCities = result.cities.filter((city, index, self) => {
      return (
        index ===
        self.findIndex((c) => c.city === city.city && c.state === city.state)
      )
    })
    return [{ ...result, cities: uniqueCities }]
  }

  return result
}

export default {
  getAddress
}
