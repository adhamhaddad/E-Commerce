import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'User updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
