import { Router } from 'express';
import {
  validateLogin,
  validateRegister
} from '../../middlewares/validation/auth';
import { authUser, createUser } from '../../controllers/auth';

const router = Router();

router
  .post('/register', validateRegister, createUser)
  .post('/login', validateLogin, authUser);

export default router;
