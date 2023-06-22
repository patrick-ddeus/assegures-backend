import { Router } from 'express'
import AddressController from '../controllers/address.controller.js'
import { validateSchema } from '../middlewares/schema.middleware.js'
import propertySchema from '../schemas/property.schema.js'

const AddressRouter = Router()

AddressRouter.get('/', AddressController.getAddress)

export default AddressRouter
