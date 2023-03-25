import { Request, Response, Router } from 'express';
import * as user from '../controllers/User';
import * as category from '../controllers/Category';
import * as product from '../controllers/Product';

const router = Router();

router.all('/admin').get('/dashboard');

router
  .all('/')
  // Users CRUD
  .post('/user', user.createUser)
  .get('/users', user.getUsers)
  .get('/user/:id', user.getUser)
  .patch('/user/:id', user.updateUser)
  .delete('/user/:id', user.deleteUser)
  .post('/auth', user.authUser)
  // Categories CRUD
  .post('/category', category.createCategory)
  .get('/categories', category.getCategories)
  .get('/category/:id', category.getCategory)
  .patch('/category/:id', category.updateCategory)
  .delete('/category/:id', category.deleteCategory)
  // Products CRUD
  .post('/product', product.createProduct)
  .get('/products', product.getProducts)
  .get('/product/:id', product.getProduct)
  .patch('/product/:id', product.updateProduct)
  .delete('/product/:id', product.deleteProduct);
  

router.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: '404 Page not found.'
  });
});

export default router;
