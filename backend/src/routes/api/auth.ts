import { Router } from 'express';
import {
  validateLogin,
  validateRegister
} from '../../middlewares/validation/auth';
import {
  authUser,
  createUser,
  updatePassword,
  refreshAccessToken
} from '../../controllers/auth';
import { validateUpdatePassword } from '../../middlewares/validation/passwords';
import { authMe } from '../../utils/token';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/register', validateRegister, createUser)
  .post('/login', validateLogin, authUser)
  .patch('/reset-password', validateUpdatePassword, verifyToken, updatePassword)
  .post('/refresh-token', refreshAccessToken)
  .get('/auth-me', authMe);

export default router;
