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

const router = Router();

router
  .post('/', validateCreatePhone, createPhone)
  .get('/:id', validateGetPhones, getPhones)
  .patch('/:id', validateUpdatePhone, updatePhone)
  .delete('/:id', validateDeletePhone, deletePhone);

export default router;
