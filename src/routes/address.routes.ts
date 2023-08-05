import { Router } from 'express'
import AddressController from '@/controllers/address.controller'

const AddressRouter = Router()

AddressRouter.get('/cities', AddressController.getCities)

export default AddressRouter
