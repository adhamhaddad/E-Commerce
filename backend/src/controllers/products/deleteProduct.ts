import { Request, Response } from 'express';
import Product from '../../models/product';
import { io } from '../../server';

const product = new Product();

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.deleteProduct(req.params.id);
    io.emit('products', { action: 'DELETE', data: response });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
