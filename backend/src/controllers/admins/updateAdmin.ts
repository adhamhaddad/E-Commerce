import { Request, Response } from 'express';
import Admin from '../../models/admin';

const admin = new Admin();

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.updateAdmin(req.params.id, req.body);
    res.status(203).json({ data: response });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
