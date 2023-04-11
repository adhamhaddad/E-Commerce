import { Request, Response } from 'express';
import Phone from '../../models/phone';

const phone = new Phone();

export const updatePhone = async (req: Request, res: Response) => {
  try {
    const response = await phone.updatePhone(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Phone updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
