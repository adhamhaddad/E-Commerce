import { Router } from 'express';
import {
  validateCreatePhone,
  validateGetPhones,
  validateUpdatePhone,
  validateDeletePhone
} from '../../middlewares/validation/phones';
import {
  createPhone,
  getPhones,
  updatePhone,
  deletePhone
} from '../../controllers/phones';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreatePhone, verifyToken, createPhone)
  .get('/:user_id', validateGetPhones, verifyToken, getPhones)
  .patch('/:id', validateUpdatePhone, verifyToken, updatePhone)
  .delete('/:id', validateDeletePhone, verifyToken, deletePhone);

export default router;
