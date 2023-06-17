import { Router } from 'express';
import ContactsController from '../controllers/contacts.controller.js';
import { validateSchema } from '../middlewares/schema.middleware.js';
import ContactSchema from '../schemas/contact.schema.js';

const ContactsRouter = Router();

ContactsRouter.get('/', ContactsController.getContacts);
ContactsRouter.post('/', validateSchema(ContactSchema), ContactsController.createContact);

export default ContactsRouter;