export type ApplicationError = {
  name: string
  message: string
}

export type PropertyQueryParams = {
  cities: string
  districts: string
  streets: string
  locale: string
  priceMin: string
  priceMax: string
  goal: string
  propertyType: string
  propertySubType: string
}

export type CreatePropertyBody = {
  title: string
  slogan: string
  description: string
  short_description: string
  price: number
  type_id: number
  subtype_id: number
  emphasis: boolean
  goal: string
  status: boolean
  bodyAddress: PropertyAddress
  number_of_rooms: number
  number_of_bathrooms: number
  number_of_garages: number
  suites: number
  total_area: number
  bodyCharacteristics: string[]
  building_area: number
}

export type PropertyAddress = {
  street: string
  district: string
  city: string
  state: string
}

export type AddressQueryParam = {
  goal: string
  locale: string
}
