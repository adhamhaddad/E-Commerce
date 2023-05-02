import { Router } from 'express';
import {
  validateCreateUserAddress,
  validateGetUserAddresses,
  validateUpdateUserAddress,
  validateDeleteUserAddress
} from '../../middlewares/validation/userAddress';
import {
  createUserAddress,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress
} from '../../controllers/userAddress';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateUserAddress, verifyToken, createUserAddress)
  .get('/:user_id', validateGetUserAddresses, verifyToken, getUserAddresses)
  .patch('/:id', validateUpdateUserAddress, verifyToken, updateUserAddress)
  .delete('/:id', validateDeleteUserAddress, verifyToken, deleteUserAddress);

export default router;
