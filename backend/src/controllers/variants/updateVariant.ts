import { Request, Response } from 'express';
import Variant from '../../models/variant';

const variant = new Variant();

export const updateVariant = async (req: Request, res: Response) => {
  try {
    const response = await variant.updateVariant(req.params.id, req.body);
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
