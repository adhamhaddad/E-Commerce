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
  updateOrder,
  deleteOrder
} from '../../controllers/orders';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateOrder, verifyToken, createOrder)
  .get('/all/:user_id', validateGetOrders, verifyToken, getOrders)
  .get('/:id', validateGetOrder, verifyToken, getOrder)
  .delete('/:id', validateDeleteOrder, verifyToken, deleteOrder);

export default router;
