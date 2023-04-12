import { Router } from 'express';
import {
  validateCreateAttributeName,
  validateGetAttributeNames,
  validateGetAttributeName,
  validateUpdateAttributeName,
  validateDeleteAttributeName
} from '../../middlewares/validation/attributeNames';
import {
  createAttributeName,
  getAttributeNames,
  getAttributeName,
  updateAttributeName,
  deleteAttributeName
} from '../../controllers/attributeNames';

const router = Router();

router
  .post('/', validateCreateAttributeName, createAttributeName)
  .get('/:id', validateGetAttributeNames, getAttributeNames)
  .get('/:id', validateGetAttributeName, getAttributeName)
  .patch('/:id', validateUpdateAttributeName, updateAttributeName)
  .delete('/:id', validateDeleteAttributeName, deleteAttributeName);

export default router;
