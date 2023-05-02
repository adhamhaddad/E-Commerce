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
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateAttributeName, verifyToken, createAttributeName)
  .get('/:id', validateGetAttributeNames, verifyToken, getAttributeNames)
  .get('/:id', validateGetAttributeName, verifyToken, getAttributeName)
  .patch('/:id', validateUpdateAttributeName, verifyToken, updateAttributeName)
  .delete(
    '/:id',
    validateDeleteAttributeName,
    verifyToken,
    deleteAttributeName
  );

export default router;
