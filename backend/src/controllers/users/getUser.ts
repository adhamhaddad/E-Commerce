import { Request, Response } from 'express';
import User from '../../models/user';

const user = new User();

export const getUser = async (req: Request, res: Response) => {
  try {
    const response = await user.getUser(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'User fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
