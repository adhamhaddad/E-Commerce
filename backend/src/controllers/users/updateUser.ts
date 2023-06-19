import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.params.id, req.body);
    res.status(203).json({ data: response });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
