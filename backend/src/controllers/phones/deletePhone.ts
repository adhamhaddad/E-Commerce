import { Request, Response } from 'express';
import Phone from '../../models/phone';

const phone = new Phone();

export const deletePhone = async (req: Request, res: Response) => {
  try {
    const response = await phone.deletePhone(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Phone deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
