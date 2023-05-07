import { Router } from 'express';
import {
  validateCreateVariant,
  validateGetVariants,
  validateGetVariant,
  validateUpdateVariant,
  validateDeleteVariant
} from '../../middlewares/validation/variants';
import {
  createVariant,
  getVariants,
  getVariant,
  updateVariant,
  deleteVariant
} from '../../controllers/variants';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateVariant, verifyToken, createVariant)
  .get('/all/:product_id', validateGetVariants, verifyToken, getVariants)
  .get('/:id', validateGetVariant, verifyToken, getVariant)
  .patch('/:id', validateUpdateVariant, verifyToken, updateVariant)
  .delete('/:id', validateDeleteVariant, verifyToken, deleteVariant);

export default router;
