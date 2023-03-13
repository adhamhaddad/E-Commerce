import { Request, Response, Router } from 'express';
import * as user from '../controllers/User';

const router = Router();

router.all('/admin').get('/dashboard');

router
  .all('/')
  // Users CRUD
  .post('/user', user.createUser)
  .get('/users', user.getUsers)
  .get('/user', user.getUser)
  .patch('/user', user.updateUser)
  .delete('/user', user.deleteUser)
  .post('/auth', user.authUser);

router.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: '404 Page not found.'
  });
});

export default router;
