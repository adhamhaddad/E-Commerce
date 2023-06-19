import { Router } from 'express';
import {
  validateCreateCategory,
  validateGetAdminCategories,
  validateGetCategory,
  validateUpdateCategory,
  validateDeleteCategory
} from '../../middlewares/validation/categories';
import {
  createCategory,
  getCategories,
  getAdminCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/categories';
import { verifyToken } from '../../middlewares/verifyToken';
import { checkFolder } from '../../utils/checkUpload';
import { icons } from '../../utils/upload';

const router = Router();

router
  .post(
    '/',
    checkFolder,
    icons,
    validateCreateCategory,
    verifyToken,
    createCategory
  )
  .get('/', verifyToken, getCategories)
  .get(
    '/admin/all/:user_id',
    validateGetAdminCategories,
    verifyToken,
    getAdminCategories
  )
  .get('/:id', validateGetCategory, verifyToken, getCategory)
  .patch(
    '/:id',
    checkFolder,
    icons,
    validateUpdateCategory,
    verifyToken,
    updateCategory
  )
  .delete('/:id', validateDeleteCategory, verifyToken, deleteCategory);

export default router;
