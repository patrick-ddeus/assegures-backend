import { Router } from 'express'
import PropertyController from '@/controllers/property.controller'
import { validateSchema } from '@/middlewares'
import { PropertySchema } from '@/schemas'

const PropertyRouter = Router()

PropertyRouter.get('/', PropertyController.getProperties)
PropertyRouter.get('/types', PropertyController.getTypesAndSubtypes)
PropertyRouter.get('/address', PropertyController.getAddress)
PropertyRouter.get('/:propertyId', PropertyController.getPropertyById)
PropertyRouter.post(
  '/',
  validateSchema(PropertySchema),
  PropertyController.createProperty
)
export default PropertyRouter
