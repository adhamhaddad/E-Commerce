import { Router } from 'express';
import {
  validateCreateOrder,
  validateGetOrders,
  validateGetOrder,
  validateDeleteOrder
} from '../../middlewares/validation/orders';
import {
  createOrder,
  getOrders,
  getOrder,
  getAdminOrders,
  updateOrder,
  deleteOrder
} from '../../controllers/orders';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateOrder, verifyToken, createOrder)
  .get('/admin/all', verifyToken, getAdminOrders)
  .get('/all/:user_id', validateGetOrders, verifyToken, getOrders)
  .get('/:id', validateGetOrder, verifyToken, getOrder)
  .patch('/:id', verifyToken, updateOrder)
  .delete('/:id', validateDeleteOrder, verifyToken, deleteOrder);

export default router;
