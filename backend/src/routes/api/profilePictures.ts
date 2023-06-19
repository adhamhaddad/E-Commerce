import { Router } from 'express';
import {
  validateCreateProfilePicture,
  validateGetProfilePicture,
  validateDeleteProfilePicture
} from '../../middlewares/validation/profilePictures';
import {
  createProfilePicture,
  getProfilePicture,
  deleteProfilePicture
} from '../../controllers/profilePictures';
import { verifyToken } from '../../middlewares/verifyToken';
import { checkFolder } from '../../utils/checkUpload';
import { avatars } from '../../utils/upload';

const router = Router();

router
  .post(
    '/',
    verifyToken,
    checkFolder,
    avatars,
    validateCreateProfilePicture,
    createProfilePicture
  )
  .get('/:user_id', validateGetProfilePicture, verifyToken, getProfilePicture)
  .delete(
    '/:id',
    validateDeleteProfilePicture,
    verifyToken,
    deleteProfilePicture
  );

export default router;
