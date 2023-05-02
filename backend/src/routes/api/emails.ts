import { Router } from 'express';
import {
  validateCreateEmail,
  validateGetEmails,
  validateUpdateEmail,
  validateDeleteEmail
} from '../../middlewares/validation/emails';
import {
  createEmail,
  getEmails,
  updateEmail,
  deleteEmail
} from '../../controllers/emails';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateEmail, verifyToken, createEmail)
  .get('/:user_id', validateGetEmails, verifyToken, getEmails)
  .patch('/:id', validateUpdateEmail, verifyToken, updateEmail)
  .delete('/:id', validateDeleteEmail, verifyToken, deleteEmail);

export default router;
