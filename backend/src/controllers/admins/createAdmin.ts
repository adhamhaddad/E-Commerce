import { Request, Response } from 'express';
import Admin from '../../models/admin';

const admin = new Admin();

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.createAdmin(req.body);
    res.status(201).json({ data: response });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
