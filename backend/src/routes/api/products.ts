import { Router } from 'express';
import {
  validateCreateProduct,
  validateGetProducts,
  validateGetProduct,
  validateGetProductBySearch,
  validateUpdateProduct,
  validateDeleteProduct
} from '../../middlewares/validation/products';
import {
  createProduct,
  getProducts,
  getProduct,
  getAllProducts,
  getProductBySearch,
  updateProduct,
  deleteProduct
} from '../../controllers/products';
import { verifyToken } from '../../middlewares/verifyToken';
import { products } from '../../utils/upload';

const router = Router();

router
  .post('/', products, validateCreateProduct, verifyToken, createProduct)
  .get('/all', verifyToken, getAllProducts)
  .get('/all/:category_id', validateGetProducts, verifyToken, getProducts)
  .get('/search', validateGetProductBySearch, verifyToken, getProductBySearch)
  .get('/:id', validateGetProduct, verifyToken, getProduct)
  .patch('/:id', validateUpdateProduct, verifyToken, updateProduct)
  .delete('/:id', validateDeleteProduct, verifyToken, deleteProduct);

export default router;
