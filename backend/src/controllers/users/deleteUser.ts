import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await user.deleteUser(req.params.id);
    res.status(200).json({ status: true, data: response });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
