import { Router } from 'express'
import PropertyController from '@/controllers/property.controller'
import { validateSchema } from '@/middlewares'
import { PropertySchema } from '@/schemas'

const PropertyRouter = Router()

PropertyRouter.get('/', PropertyController.getProperties)
PropertyRouter.post(
  '/',
  validateSchema(PropertySchema),
  PropertyController.createProperty
)
PropertyRouter.get('/types', PropertyController.getTypesAndSubtypes)

export default PropertyRouter
