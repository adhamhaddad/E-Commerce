import { Request, Response } from 'express';
import Phone from '../../models/phone';

const phone = new Phone();

export const getPhones = async (req: Request, res: Response) => {
  try {
    const response = await phone.getPhones(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
