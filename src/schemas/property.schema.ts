import Joi from 'joi'
import { CreatePropertyBody } from '@/protocols'

const PropertySchema = Joi.object<CreatePropertyBody>({
  title: Joi.string().required(),
  ref: Joi.string().required(),
  description: Joi.string().required(),
  short_description: Joi.string().required(),
  price: Joi.number().required(),
  type_id: Joi.number().required(),
  subtype_id: Joi.number().required(),
  emphasis: Joi.boolean().required(),
  goal: Joi.string().required(),
  status: Joi.string().required(),
  mapAddress: Joi.string().required(),
  street: Joi.string().required(),
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  number_of_rooms: Joi.number().required(),
  number_of_bathrooms: Joi.number().required(),
  number_of_garages: Joi.number().required(),
  suites: Joi.number().required(),
  total_area: Joi.number().required(),
  bodyCharacteristics: Joi.array().items(Joi.string()).required(),
  building_area: Joi.number().required()
})

export { PropertySchema }
