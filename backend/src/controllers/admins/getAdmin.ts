import { Request, Response } from 'express';
import Admin from '../../models/admin';

const admin = new Admin();

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.getAdmin(req.params.id);
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
