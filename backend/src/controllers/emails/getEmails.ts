import { Request, Response } from 'express';
import Email from '../../models/email';

const email = new Email();

export const getEmails = async (req: Request, res: Response) => {
  try {
    const response = await email.getEmails(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
