import { Router } from 'express'
import AddressRouter from './address.routes.js'
import ContactsRouter from './contacts.routes.js'
import PropertyRouter from './properties.routes.js'

const IndexRouter = Router()

IndexRouter.use('/properties', PropertyRouter)
IndexRouter.use('/contacts', ContactsRouter)
IndexRouter.use('/addresses', AddressRouter)

export default IndexRouter
