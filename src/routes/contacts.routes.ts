import { Router } from 'express'
import ContactsController from '@/controllers/contacts.controller'
import { validateSchema } from '@/middlewares/schema.middleware'
import { ContactSchema } from '@/schemas'

const ContactsRouter = Router()

ContactsRouter.get('/', ContactsController.getContacts)
ContactsRouter.post(
  '/',
  validateSchema(ContactSchema),
  ContactsController.createContact
)

export default ContactsRouter
