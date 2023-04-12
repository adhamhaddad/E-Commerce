import { Router } from 'express';
import {
  validateCreateIcon,
  validateUpdateIcon,
  validateDeleteIcon
} from '../../middlewares/validation/icons';
import { createIcon, updateIcon, deleteIcon } from '../../controllers/icons';
import { upload } from '../../utils/upload';

const router = Router();

router
  .post('/', upload.single('icon_url'), validateCreateIcon, createIcon)
  .patch('/:id', validateUpdateIcon, updateIcon)
  .delete('/:id', validateDeleteIcon, deleteIcon);

export default router;
