import { Router } from 'express';
import {
  validateCreateSubCategory,
  validateGetSubCategory,
  validateUpdateSubCategory,
  validateDeleteSubCategory
} from '../../middlewares/validation/subCategories';
import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
} from '../../controllers/subCategories';

const router = Router();

router
  .post('/', validateCreateSubCategory, createSubCategory)
  .get('/:id', validateGetSubCategory, getSubCategories)
  .patch('/:id', validateUpdateSubCategory, updateSubCategory)
  .delete('/:id', validateDeleteSubCategory, deleteSubCategory);

export default router;
