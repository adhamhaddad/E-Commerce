import { Router, Request, Response } from 'express';
import { auth, user, email, phone, userAddress, categories } from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/emails', email);
router.use('/phone', phone);
router.use('/user-address', userAddress);
router.use('/categories', categories);

router.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Page not found!'
  });
});
export default router;
