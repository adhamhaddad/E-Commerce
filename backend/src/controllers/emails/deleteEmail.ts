import { Request, Response } from 'express';
import Email from '../../models/email';

const email = new Email();

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.deleteEmail(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Email deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
