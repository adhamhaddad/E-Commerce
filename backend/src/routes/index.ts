import { Router } from 'express';
import {
  auth,
  user,
  email,
  phone,
  userAddress,
  icons,
  categories,
  subCategories,
  products,
  variants,
  attributeNames,
  attributeValues,
  orders
} from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/emails', email);
router.use('/phones', phone);
router.use('/user-addresses', userAddress);
router.use('/icons', icons);
router.use('/categories', categories);
router.use('/sub-categories', subCategories);
router.use('/products', products);
router.use('/variants', variants);
router.use('/attribute-names', attributeNames);
router.use('/attribute-values', attributeValues);
router.use('/orders', orders);

export default router;
