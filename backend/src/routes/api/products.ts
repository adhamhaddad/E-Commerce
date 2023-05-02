import { Router } from 'express';
import {
  validateCreateProduct,
  validateGetProducts,
  validateGetProduct,
  validateUpdateProduct,
  validateDeleteProduct
} from '../../middlewares/validation/products';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/products';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateProduct, verifyToken, createProduct)
  .get('/all/:sub_category_id', validateGetProducts, verifyToken, getProducts)
  .get('/:id', validateGetProduct, verifyToken, getProduct)
  .patch('/:id', validateUpdateProduct, verifyToken, updateProduct)
  .delete('/:id', validateDeleteProduct, verifyToken, deleteProduct);

export default router;
