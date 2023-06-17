import { Router } from 'express';
import ContactsRouter from './contacts.routes.js';
import PropertyRouter from './properties.routes.js';

const IndexRouter = Router();

IndexRouter.use('/properties', PropertyRouter);
IndexRouter.use('/contacts', ContactsRouter);

export default IndexRouter;