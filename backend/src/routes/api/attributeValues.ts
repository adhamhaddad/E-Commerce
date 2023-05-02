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
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateAttributeValue, verifyToken, createAttributeValue)
  .get('/:id', validateGetAttributeValues, verifyToken, getAttributeValues)
  .get('/:id', validateGetAttributeValue, verifyToken, getAttributeValue)
  .patch(
    '/:id',
    validateUpdateAttributeValue,
    verifyToken,
    updateAttributeValue
  )
  .delete(
    '/:id',
    validateDeleteAttributeValue,
    verifyToken,
    deleteAttributeValue
  );

export default router;
