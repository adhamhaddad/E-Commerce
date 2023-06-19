import { Router } from 'express';
import {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
} from '../../controllers/admins';
import {
  validateCreateAdmin,
  validateGetAdmin,
  validateUpdateAdmin,
  validateDeleteAdmin
} from '../../middlewares/validation/admins';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateAdmin, createAdmin)
  .get('/', verifyToken, getAdmins)
  .get('/:id', validateGetAdmin, verifyToken, getAdmin)
  .patch('/:id', validateUpdateAdmin, verifyToken, updateAdmin)
  .delete('/:id', validateDeleteAdmin, verifyToken, deleteAdmin);

export default router;
