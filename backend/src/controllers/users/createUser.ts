import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    res.status(201).json({ data: response });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
