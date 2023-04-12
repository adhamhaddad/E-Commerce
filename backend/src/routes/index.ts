import { Router } from 'express';
import {
  auth,
  user,
  email,
  phone,
  userAddress,
  categories,
  icons,
  tags,
  attributeNames,
  attributeValues
} from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/emails', email);
router.use('/phone', phone);
router.use('/user-address', userAddress);
router.use('/categories', categories);
router.use('/icons', icons);
router.use('/tags', tags);
router.use('/attribute-names', attributeNames);
router.use('/attribute-values', attributeValues);

export default router;
