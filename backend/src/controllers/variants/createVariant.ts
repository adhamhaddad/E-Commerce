import { Request, Response } from 'express';
import Variant from '../../models/variant';

const variant = new Variant();

export const createVariant = async (req: Request, res: Response) => {
  try {
    const response = await variant.createVariant(req.body);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
