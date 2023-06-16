import { Router } from 'express';
import PropertyRouter from './property.routes.js';

const IndexRouter = Router();

IndexRouter.use('/property', PropertyRouter);

export default IndexRouter;