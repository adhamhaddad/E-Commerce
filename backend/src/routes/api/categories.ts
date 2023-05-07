import { Router } from 'express';
import {
  validateCreateCategory,
  validateGetCategories,
  validateGetCategory,
  validateUpdateCategory,
  validateDeleteCategory
} from '../../middlewares/validation/categories';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/categories';
import { verifyToken } from '../../middlewares/verifyToken';
import { upload } from '../../utils/upload';

const router = Router();

router
  .post('/', upload, validateCreateCategory, verifyToken, createCategory)
  .get('/all', verifyToken, getCategories)
  .get('/:id', validateGetCategory, verifyToken, getCategory)
  .patch('/:id', validateUpdateCategory, verifyToken, updateCategory)
  .delete('/:id', validateDeleteCategory, verifyToken, deleteCategory);

export default router;
