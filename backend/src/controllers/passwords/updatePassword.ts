import { Request, Response } from 'express';
import Password from '../../models/password';

const password = new Password();

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const response = await password.updatePassword(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
