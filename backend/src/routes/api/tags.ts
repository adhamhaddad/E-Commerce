import { Router } from 'express';
import {
  validateCreateTag,
  validateUpdateTag,
  validateDeleteTag
} from '../../middlewares/validation/tags';
import { createTag, updateTag, deleteTag } from '../../controllers/tags';

const router = Router();

router
  .post('/', validateCreateTag, createTag)
  .patch('/:id', validateUpdateTag, updateTag)
  .delete('/:id', validateDeleteTag, deleteTag);

export default router;
