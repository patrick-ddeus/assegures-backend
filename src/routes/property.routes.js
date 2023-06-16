import { Router } from 'express';
import PropertyController from '../controllers/property.controller.js';

const PropertyRouter = Router();

PropertyRouter.get('/', PropertyController.getProperties);

export default PropertyRouter;