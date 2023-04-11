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

const router = Router();

router
  .post('/', validateCreateEmail, createEmail)
  .get('/:id', validateGetEmails, getEmails)
  .patch('/:id', validateUpdateEmail, updateEmail)
  .delete('/:id', validateDeleteEmail, deleteEmail);

export default router;
