import { Router } from 'express';
import {
  validateCreateSubCategory,
  validateGetSubCategories,
  validateGetSubCategory,
  validateUpdateSubCategory,
  validateDeleteSubCategory
} from '../../middlewares/validation/subCategories';
import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
} from '../../controllers/subCategories';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateSubCategory, verifyToken, createSubCategory)
  .get('/all/:user_id', validateGetSubCategories, verifyToken, getSubCategories)
  .get('/:id', validateGetSubCategory, verifyToken, getSubCategory)
  .patch('/:id', validateUpdateSubCategory, verifyToken, updateSubCategory)
  .delete('/:id', validateDeleteSubCategory, verifyToken, deleteSubCategory);

export default router;
