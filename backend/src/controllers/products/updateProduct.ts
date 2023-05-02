import { Request, Response } from 'express';
import Product from '../../models/product';

const product = new Product();

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.updateProduct(req.params.id, req.body);
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
