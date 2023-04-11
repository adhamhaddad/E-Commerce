import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../../controllers/users';
import {
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser
} from '../../middlewares/validation/users';

const router = Router();
router
  .get('/:id', validateGetUser, getUser)
  .patch('/:id', validateUpdateUser, updateUser)
  .delete('/:id', validateDeleteUser, deleteUser);

export default router;
