import { Router } from 'express';
import {
  validateCreateAttributeValue,
  validateGetAttributeValues,
  validateGetAttributeValue,
  validateUpdateAttributeValue,
  validateDeleteAttributeValue
} from '../../middlewares/validation/attributeValues';
import {
  createAttributeValue,
  getAttributeValues,
  getAttributeValue,
  updateAttributeValue,
  deleteAttributeValue
} from '../../controllers/attributeValues';

const router = Router();

router
  .post('/', validateCreateAttributeValue, createAttributeValue)
  .get('/:id', validateGetAttributeValues, getAttributeValues)
  .get('/:id', validateGetAttributeValue, getAttributeValue)
  .patch('/:id', validateUpdateAttributeValue, updateAttributeValue)
  .delete('/:id', validateDeleteAttributeValue, deleteAttributeValue);

export default router;
