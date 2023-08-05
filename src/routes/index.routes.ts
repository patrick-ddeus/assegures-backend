import { Router } from 'express'
import AddressRouter from './address.routes'
import ContactsRouter from './contacts.routes'
import PropertyRouter from './properties.routes'

const IndexRouter = Router()

IndexRouter.use('/properties', PropertyRouter)
IndexRouter.use('/contacts', ContactsRouter)
IndexRouter.use('/address', AddressRouter)

export default IndexRouter
