import { Request, Response } from 'express';
import Variant from '../../models/variant';

const variant = new Variant();

export const getVariants = async (req: Request, res: Response) => {
  try {
    const response = await variant.getVariants(req.params.product_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
