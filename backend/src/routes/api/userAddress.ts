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

const router = Router();

router
  .post('/', validateCreateUserAddress, createUserAddress)
  .get('/:id', validateGetUserAddresses, getUserAddresses)
  .patch('/:id', validateUpdateUserAddress, updateUserAddress)
  .delete('/:id', validateDeleteUserAddress, deleteUserAddress);

export default router;
