import { Router } from 'express';
import {
  validateCreateCategory,
  validateGetCategories,
  validateUpdateCategory,
  validateDeleteCategory
} from '../../middlewares/validation/categories';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../../controllers/categories';

const router = Router();

router
  .post('/', validateCreateCategory, createCategory)
  .get('/:id', validateGetCategories, getCategories)
  .patch('/:id', validateUpdateCategory, updateCategory)
  .delete('/:id', validateDeleteCategory, deleteCategory);

export default router;
