import { Request, Response } from 'express';
import Product from '../../models/product';

const product = new Product();

export const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.getProduct(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
