import { Router } from 'express';
import PropertyController from '../controllers/property.controller.js';
import { validateSchema } from '../middlewares/schema.middleware.js';
import propertySchema from '../schemas/property.schema.js';

const PropertyRouter = Router();

PropertyRouter.get('/', PropertyController.getProperties);
PropertyRouter.post('/', validateSchema(propertySchema),PropertyController.createProperty);

export default PropertyRouter;