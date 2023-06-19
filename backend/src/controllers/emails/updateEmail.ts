import { Request, Response } from 'express';
import Email from '../../models/email';

const email = new Email();

export const updateEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.updateEmail(req.params.id, req.body);
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
