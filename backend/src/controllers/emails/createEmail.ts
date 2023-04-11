import { Request, Response } from 'express';
import Email from '../../models/email';

const email = new Email();

export const createEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.createEmail(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Email created successfully.'
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
