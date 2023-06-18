import { Router } from 'express';
import { createAdmin, getAdmins, deleteAdmin } from '../../controllers/admins';
import {
  validateCreateUser,
  validateDeleteUser
} from '../../middlewares/validation/users';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateUser, createAdmin)
  .get('/', verifyToken, getAdmins)
  .delete('/:id', validateDeleteUser, verifyToken, deleteAdmin);

export default router;
