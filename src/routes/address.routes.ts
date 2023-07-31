import { Router } from 'express'
import AddressController from '@/controllers/address.controller'

const AddressRouter = Router()

AddressRouter.get('/', AddressController.getAddress)

export default AddressRouter
