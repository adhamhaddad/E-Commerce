import { Request, Response } from 'express';
import Product from '../../models/product';

const product = new Product();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response = await product.getAllProducts();
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
